export default {
  name: "Nottie",
  slug: "nottie",
  version: "1.0.1",
  orientation: "portrait",
  icon: "./assets/icon.jpg",
  plugins: [
    [
      "expo-notifications",
      {
        icon: "./assets/notification-icon.png",
        color: "#ffffff",
      },
    ],
    [
      "expo-image-picker",
      {
        photosPermission:
          "The app accesses your photos to let you set background in flipnote",
      },
    ],
    [
      "expo-document-picker",
      {
        iCloudContainerEnvironment: "Production",
      },
    ],
  ],
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "ir.tahanian.nottie",
    buildNumber: "1.0.5",
  },
  android: {
    package: "ir.tahanian.nottie",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FEFFEF",
    },
  },
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  extra: {
    eas: {
      projectId: "870eb609-0590-442d-9f7b-c4f88f61fc87",
    },
  },
  owner: "miladtahanian",
  build: {
    preview: {
      android: {
        buildType: "apk",
      },
    },
    preview2: {
      android: {
        gradleCommand: ":app:assembleRelease",
      },
    },
    preview3: {
      developmentClient: true,
    },
    production: {},
  },
};
