import { Dispatch, SetStateAction } from "react";
import { Note, ReminderProps } from "../types";
import { SharedValue } from "react-native-reanimated";

export interface NoteOverlaysProps {
  editNote: Note;
  setEditNote: Dispatch<SetStateAction<Note>>;
  setReminder: Dispatch<SetStateAction<ReminderProps>>;
  reminder: ReminderProps;
  onReminderOpen: () => void;
  defaultContentTheme: string;
  reminderDialog: boolean;
  setReminderDialog: Dispatch<SetStateAction<boolean>>;
  shareImage: (onCancel: () => void) => void;
  sharePdf: (onCancel: () => void) => void;
  saveImage: (onCancel: () => void) => void;
  savePdf: (onCancel: () => void) => void;
  noteStateIsEmpty: boolean;
  textFiltered: string;
  shareNote: (onCancel: () => void, fileName?: string) => void;
  saveNote: (onCancel: () => void, fileName?: string) => void;
  bottomSpace: SharedValue<number>;
}
