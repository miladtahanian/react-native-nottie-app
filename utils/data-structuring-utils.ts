import { Note, NotePreviewTypes } from "../screens/note";
export function toggleArrayElement<T>(array: T[], value: T) {
  const indexOfValue = array.indexOf(value);
  if (indexOfValue === -1) {
    return [...array, value];
  }
  return removeElementAtIndex(array, indexOfValue);
}
export function extractText(html: string): string {
  const tagRegex = /<[^>]*>/g;
  let result = html.replace(tagRegex, "");
  const entitiesToExclude = [
    "&nbsp;",
    "&amp;",
    "&lt;",
    "&gt;",
    "&quot;",
    "&apos;",
  ];
  entitiesToExclude.forEach((entity) => {
    const entityRegex = new RegExp(entity, "g");
    result = result.replace(entityRegex, "");
  });

  return result;
}

export function formatBytes(bytes: number): string {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 1 || bytes === 0) return bytes + " Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
}

export function toggleState<T>(
  initialValue: T,
  changeValue: T,
  additionalFunction?: () => void
) {
  return (prevState: T) => {
    if (prevState !== changeValue) {
      additionalFunction && additionalFunction();
      return changeValue;
    } else {
      return initialValue;
    }
  };
}
export function toggleObjectKeyValue<O, K extends keyof O, V>(
  object: O,
  key: K,
  value: V
) {
  if (Object.keys(object).includes(key.toString())) {
    return removeObjectKey(object, key);
  }

  return { ...object, [key]: value };
}
export function removeElementAtIndex<T>(array: T[], removeIndex: number) {
  return [...array.slice(0, removeIndex), ...array.slice(removeIndex + 1)];
}
export function generateUniqueFileId() {
  const time = new Date().getTime;
  const random = Math.floor(Math.random() * 10000);
  return `${time}-${random}`;
}
export function reinjectElementInArray(array: Note[], newElement: Note) {
  const prevIndex = array.findLastIndex((e) => e.id < newElement.id);
  return [
    ...array.slice(0, prevIndex + 1),
    newElement,
    ...array.slice(prevIndex + 1),
  ];
}
export function BGtype(uri: string) {
  if (uri.includes("/")) {
    return "img";
  }
  return "color";
}
export function replaceElementAtIndex<T>(
  array: T[],
  replaceIndex: number,
  newElement: T
) {
  if (replaceIndex > -1) {
    return [
      ...array.slice(0, replaceIndex),
      newElement,
      ...array.slice(replaceIndex + 1),
    ];
  }
  return array;
}
export function removeElement<T>(array: T[], removeElement: T) {
  const removeIndex = array.indexOf(removeElement);
  return [...array.slice(0, removeIndex), ...array.slice(removeIndex + 1)];
}

export function removeObjectKey<T, K extends keyof T>(obj: T, removeKey: K) {
  const { [removeKey]: removedKey, ...newObj } = obj;
  return newObj;
}
export function replaceElementAtId(
  array: NotePreviewTypes[],
  replaceId: number,
  newElement: NotePreviewTypes
) {
  const arrayIndexOfId = array.findIndex((e) => e.id === replaceId);
  if (arrayIndexOfId > -1) {
    return [
      ...array.slice(0, arrayIndexOfId),
      newElement,
      ...array.slice(arrayIndexOfId + 1),
    ];
  }
  return [newElement, ...array];
}

type Timer = ReturnType<typeof setTimeout>;

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: Timer | null = null;

  return function (...args: Parameters<T>) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
export function removeElementAtId(
  array: NotePreviewTypes[],
  replaceId: number
) {
  const arrayIndexOfId = array.findIndex((e) => e.id === replaceId);
  if (arrayIndexOfId > -1) {
    return [
      ...array.slice(0, arrayIndexOfId),
      ...array.slice(arrayIndexOfId + 1),
    ];
  }
  return array;
}
export function removeArrayKeyDuplicates<T, K extends keyof T>(
  array: T[],
  key: K
): T[K][] {
  return array.reduce((values, note) => {
    const keyValue = note[key];
    if (keyValue && !values.includes(keyValue)) {
      return [...values, keyValue];
    }
    return values;
  }, []);
}

export function excludeArrayElements<T>(array: T[], itemsToRemove: T[]) {
  return array.filter((e: T) => !itemsToRemove.includes(e));
}

export function dateTime(date: Date, showSec = true) {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const min =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const sec =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return `${day}.${month}.${year} ${hour}:${min}${showSec ? `:${sec}` : ""}`;
}

export function fileExtension(file: string) {
  return file.slice(0, file.lastIndexOf(".") + 1);
}
