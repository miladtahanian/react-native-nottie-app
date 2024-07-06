import * as fs from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Notifications from "expo-notifications";
import * as Print from "expo-print";
import * as Share from "expo-sharing";
import { Dispatch, SetStateAction } from "react";
import ViewShot from "react-native-view-shot";
import { NOTES_PATH, contentLengthLimit } from "../constants";
import { Note } from "../screens";
import { dateTime } from "../utils";
import { useHTMLRenderedContent } from "./use-note-content";
import { useLoading } from "./use-loading-dialog";
import { useToast } from "./use-toast";
export function useNoteUtils(
  id: number,
  editNote: Note,
  setEditNote: Dispatch<SetStateAction<Note>>,
  setReminderDialog: Dispatch<SetStateAction<boolean>>,
  setShowTitle: Dispatch<SetStateAction<boolean>>,
  setCapturing: Dispatch<SetStateAction<boolean>>,
  viewShotRef: React.MutableRefObject<ViewShot>,
  noteStateIsEmpty: boolean
) {
  const toast = useToast();
  const loading = useLoading();
  const scheduleDateForNotification =
    editNote.reminder && new Date(editNote.reminder);
  const html = useHTMLRenderedContent(
    editNote.text,
    editNote.title,
    editNote.background,
    editNote.imageOpacity,
    editNote.imageData
  );
  async function ShareNote(
    cancel: () => void,
    fileName: string = editNote.title.substring(0, 70) || String(id)
  ) {
    try {
      const output = `${fs.cacheDirectory}/${fileName}.flipnote`;
      const content = await fs.readAsStringAsync(`${NOTES_PATH}/${id}`);
      await fs.writeAsStringAsync(output, content);
      await Share.shareAsync(output, { mimeType: "application/json" });
      await fs.deleteAsync(output);
    } catch (error) {
      toast({ message: "Failed to share note file", textColor: "red" });
    } finally {
      cancel();
    }
  }
  async function SaveNote(
    cancel: () => void,
    fileName: string = editNote.title.substring(0, 70) || String(id)
  ) {
    try {
      const permission =
        await fs.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permission.granted) {
        const content = await fs.readAsStringAsync(`${NOTES_PATH}/${id}`, {
          encoding: "base64",
        });
        const newUri = await fs.StorageAccessFramework.createFileAsync(
          permission.directoryUri,
          `${fileName}.nottie`,
          ""
        );
        await fs.writeAsStringAsync(newUri, content, { encoding: "base64" });
        toast({ message: "فایل ذخیره شد" });
      }
    } catch (error) {
      toast({ message: "خطا در ذخیره سازی فایل", textColor: "red" });
    } finally {
      cancel();
    }
  }
  async function SharePDF(cancel: () => void) {
    loading("در حال آماده سازی فایل PDF");
    Print.printToFileAsync({
      width: 794,
      height: 1102,
      html,
      useMarkupFormatter: true,
    })
      .then((result) => {
        Share.shareAsync(result.uri, {
          UTI: ".pdf",
          mimeType: "application/pdf",
        })
          .then(() =>
            fs.deleteAsync(result.uri, { idempotent: true }).finally(cancel)
          )
          .catch(() =>
            toast({ message: "خطا در اشتراک گذاری فایل PDF", textColor: "red" })
          );
      })
      .catch(() =>
        toast({ message: "خطا در ساخت فایل PDF", textColor: "red" })
      )
      .finally(() => loading(false));
  }
  async function SavePDF(cancel: () => void) {
    try {
      loading("در حال آماده سازی فایل PDF");
      const permission =
        await fs.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permission.granted) {
        const result = await Print.printToFileAsync({
          width: 794,
          height: 1102,
          html,
          base64: true,
        });
        const newUri = await fs.StorageAccessFramework.createFileAsync(
          permission.directoryUri,
          `Nottie-${dateTime(new Date(), false)}.pdf`,
          "application/pdf"
        );
        await fs.writeAsStringAsync(newUri, result.base64, {
          encoding: "base64",
        });
        await fs.deleteAsync(result.uri, { idempotent: true });
        toast({ message: "فایل PDF ذخیره شد" });
      }
    } catch (error) {
      toast({ message: "خطا در ذخیره سازی فایل PDF" });
    } finally {
      cancel();
      loading(false);
    }
  }
  function ShareImage(cancel: () => void) {
    if (editNote.text.length > contentLengthLimit()) {
      toast({
        message: `یادداشت شما بیش از اندازه تعیین شده بزرگ است.`,
        duration: 3500,
        textColor: "orange",
      });
      cancel();
      return;
    }
    loading("در حال آماده سازی عکس");
    setCapturing(true);
    if (editNote.title.length === 0) {
      setShowTitle(false);
    }
    setTimeout(() => {
      viewShotRef.current
        ?.capture()
        .then((image) => {
          Share.shareAsync(image).then(cancel);
        })
        .finally(() => loading(false));
    }, 100);
    setTimeout(() => {
      setCapturing(false);
      setShowTitle(true);
    }, 300);
  }
  function SaveImage(cancel: () => void) {
    if (editNote.text.length > contentLengthLimit()) {
      toast({
        message: `یادداشت شما بیش از اندازه تعیین شده بزرگ است.`,
        duration: 3500,
        textColor: "orange",
      });
      cancel();
      return;
    }
    loading("در حال آماده سازی عکس");
    setCapturing(true);
    if (editNote.title.length === 0) {
      setShowTitle(false);
    }

    setTimeout(() => {
      viewShotRef.current
        ?.capture()
        .then((image) => {
          MediaLibrary.saveToLibraryAsync(image)
            .then(() => toast({ message: "عکس در گالری ذخیره شد" }))
            .then(cancel)
            .catch(() =>
              toast({ message: "خطا در ذخیره سازی فایل", textColor: "red" })
            );
        })
        .catch(() =>
          toast({ message: "خطا در ساخت فایل", textColor: "red" })
        )
        .finally(() => loading(false));
    }, 100);
    setTimeout(() => {
      setCapturing(false);
      setShowTitle(true);
    }, 300);
  }
  function openReminder() {
    if (noteStateIsEmpty) {
      toast({
        message: "برای ثبت اعلان نوشته ای را شروع کنید",
      });
      return;
    }
    if (scheduleDateForNotification > new Date()) {
      toast({
        button: {
          title: "لغو",
          onPress: async () => {
            await Notifications.cancelScheduledNotificationAsync(id.toString());
            setEditNote((prev) => ({ ...prev, reminder: null }));
            toast({ message: "لغو شد" });
          },
        },
        message: `یادداشت برای ${dateTime(
          scheduleDateForNotification
        )} زمانبندی شده است`,
      });
      return;
    }
    if (scheduleDateForNotification <= new Date()) {
      setEditNote((prev) => ({ ...prev, reminder: null }));
      setReminderDialog(true);
      return;
    }
    setReminderDialog(true);
  }

  return {
    SaveNote,
    ShareNote,
    openReminder,
    SaveImage,
    SavePDF,
    ShareImage,
    SharePDF,
  };
}
