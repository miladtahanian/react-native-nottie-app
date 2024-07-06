import * as DocumentPicker from "expo-document-picker";
import * as fs from "expo-file-system";
import { NOTES_PATH } from "../constants";
import { Note } from "../screens";
import { useLoading } from "./use-loading-dialog";
import { useRequest } from "./use-request";
import { useToast } from "./use-toast";
function validateJSON(jsonText: string): boolean {
  try {
    if (
      !jsonText.startsWith("{") &&
      !jsonText.endsWith("}") &&
      !jsonText.includes("title") &&
      !jsonText.includes("text") &&
      !jsonText.includes("isFavorite") &&
      !jsonText.includes("background") &&
      !jsonText.includes("styles") &&
      !jsonText.includes("reminder") &&
      !jsonText.includes("contentPosition") &&
      !jsonText.includes("imageOpacity")
    ) {
      return false;
    }
    JSON.parse(jsonText);
  } catch (_) {
    return false;
  }
  return true;
}
export function useStorageUtils() {
  const toast = useToast();
  const { updateListOfNotes } = useRequest();
  const setLoading = useLoading();

  const importNote = async (cancel: () => void) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: false,
      });

      if (result.canceled) {
        return;
      }
      const selectedFile = result.assets[0];
      setLoading(true);

      const fileContent = await fs.readAsStringAsync(selectedFile.uri, {
        encoding: "utf8",
      });

      if (
        !validateJSON(fileContent) &&
        !selectedFile.name.endsWith(".nottie")
      ) {
        toast({ message: "خطا: فایل پشتیبانی نشده", textColor: "red" });
        setLoading(false);
        return;
      }
      let newId = new Date().getTime();
      const note: Note = JSON.parse(fileContent);
      if (note.imageData.length > 0) {
        await fs.writeAsStringAsync(
          `${NOTES_PATH}/${newId}`,
          JSON.stringify({
            ...note,
            id: newId,
            background: note.imageData,
            imageData: "",
          })
        );
      } else {
        await fs.writeAsStringAsync(
          `${NOTES_PATH}/${newId}`,
          JSON.stringify({ ...note, id: newId })
        );
      }
      await updateListOfNotes([newId]);
    } catch (error) {
    } finally {
      cancel();
      setLoading(false);
    }
  };
  return { importNote };
}
