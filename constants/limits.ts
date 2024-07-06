import { extractText } from "../utils";

export const titleLimit = (title: string) => title.substring(0, 80);
export const textLimit = (text: string) => extractText(text).substring(0, 130);
