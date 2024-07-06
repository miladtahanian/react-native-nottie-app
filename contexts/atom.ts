import { atom } from "recoil";
import { NotePreviewTypes, UserdataState } from "../screens/note/types";
export const EMPTY_NOTE_STATE: NotePreviewTypes = {
  id: 0,
  title: "",
  text: "",
  isFavorite: false,
  background: "#fff",
  reminder: null,
  imageOpacity: 0,
};

export const notesData = atom<UserdataState>({
  key: "userdata",
  default: {
    loading: true,
    data: [],
    loaded: false,
  },
});

export const receivedNotifications = atom<number[]>({
  key: "notifications",
  default: [],
});
