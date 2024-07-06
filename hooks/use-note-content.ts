import { useMemo } from "react";
import { Platform } from "react-native";
import { darkCardColors } from "../constants/colors";
import { includeNewLines } from "../utils/style-converter";

export function useHTMLRenderedContent(
  text: string,
  title: string,
  bg: string,
  imageOpacity: number,
  imageData: string
) {
  const defaultThemeText = useMemo(() => {
    if (bg.includes("/") && imageOpacity > 0.4 && Platform.OS !== "ios") {
      return "#ffffff";
    }
    if (darkCardColors.includes(bg)) {
      return "#ffffff";
    } else {
      return "#000000";
    }
  }, [bg, imageOpacity]);

  return `<!DOCTYPE html>
  <html>
  <head>
    <style>
        html {
        color: ${defaultThemeText};
        background-color: ${
          bg.includes("/") || bg.length === 0 ? "transparent" : bg
        }
        }
        img {
           padding-right: 32px;
           width: 100%;
        }
    </style>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="margin: 0px;">
  ${
    bg.includes("/") && Platform.OS === "android"
      ? `<img src="${
          imageData.length === 0 ? bg : imageData
        }" style="position: fixed; top: 0px; left: 0px; z-index: -2; width: 100vw; height: 100vh; object-fit: cover" /><div style="position: fixed; top: 0px; left: 0px; z-index: -1; width: 100vw; height: 100vh; background-color: #000; opacity: ${imageOpacity}"></div>`
      : ""
  }
  <div style="margin: 16px;">
   ${
     title.length > 0
       ? `<h1 style="font-size: 40px; color: ${defaultThemeText}; margin-top: 16px; margin-bottom: 16px; font-weight: bold;">${title}</h1>`
       : ""
   }
     ${text}
  </div>
  </body>
  </html>`;
}
