module.exports = () => {
  const appMode = process.env.APP_MODE || 'test';

  return {
    expo: {
      name: "Marlin",
      slug: "marlin",
      version: "1.0.1",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "marlin",
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      ios: {
        supportsTablet: true
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/images/adaptive-icon.png",
          backgroundColor: "#ffffff"
        },
        edgeToEdgeEnabled: true,
        package: "com.marlin.app"
      },
      web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png"
      },
      plugins: [
        "expo-router",
        [
          "expo-splash-screen",
          {
            image: "./assets/images/splash-icon.png",
            imageWidth: 200,
            resizeMode: "contain",
            backgroundColor: "#ffffff"
          }
        ],
        "@maplibre/maplibre-react-native",
        "expo-asset",
        "expo-localization"
      ],
      experiments: {
        typedRoutes: true
      },
      extra: {
        appMode,
      }
    }
  };
};
