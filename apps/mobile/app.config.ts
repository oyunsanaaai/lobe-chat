import { ConfigContext, ExpoConfig } from 'expo/config';

/**
 * Expo 配置
 * 使用 TypeScript 提供类型安全和自动补全
 * @see https://docs.expo.dev/workflow/configuration/
 */
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  android: {
    adaptiveIcon: {
      backgroundColor: '#ffffff',
      foregroundImage: './assets/images/adaptive-icon.png',
    },
    package: 'com.lobehub.app',
  },
  experiments: {
    // @ts-ignore
    appDir: './src/app',
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: 'f02d6f4f-e042-4c95-ba0d-ac06bb474ef0',
    },
    router: {
      origin: false,
    },
  },
  icon: './assets/images/icon.png',

  ios: {
    appleTeamId: '4684H589ZU',
    bundleIdentifier: 'com.lobehub.app',
    icon: './assets/images/ios.icon',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true,
      },
    },
    supportsTablet: true,
    userInterfaceStyle: 'automatic',
  },
  name: 'LobeHub',
  newArchEnabled: true,
  orientation: 'portrait',
  owner: 'lobehub',
  plugins: [
    'expo-router',
    './plugins/withFbjniFix',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#ffffff',
        dark: {
          backgroundColor: '#000000',
          image: './assets/images/splash-icon-dark.png',
        },
        image: './assets/images/splash-icon-light.png',
        imageWidth: 200,
        resizeMode: 'contain',
      },
    ],
    [
      'expo-font',
      {
        android: [
          {
            fontDefinitions: [
              {
                path: './assets/fonts/Hack-Regular.ttf',
                weight: 400,
              },
              {
                path: './assets/fonts/Hack-Bold.ttf',
                weight: 700,
              },
              {
                path: './assets/fonts/Hack-Italic.ttf',
                style: 'italic',
                weight: 400,
              },
              {
                path: './assets/fonts/Hack-BoldItalic.ttf',
                style: 'italic',
                weight: 700,
              },
            ],
            fontFamily: 'Hack',
          },
          {
            fontDefinitions: [
              {
                path: './assets/fonts/HarmonyOS_Sans_SC_Regular.ttf',
                weight: 400,
              },
              {
                path: './assets/fonts/HarmonyOS_Sans_SC_Medium.ttf',
                weight: 500,
              },
              {
                path: './assets/fonts/HarmonyOS_Sans_SC_Bold.ttf',
                weight: 700,
              },
            ],
            fontFamily: 'HarmonyOS-Sans-SC',
          },
        ],
        fonts: [
          './assets/fonts/Hack-Regular.ttf',
          './assets/fonts/Hack-Bold.ttf',
          './assets/fonts/Hack-Italic.ttf',
          './assets/fonts/Hack-BoldItalic.ttf',
          './assets/fonts/HarmonyOS_Sans_SC_Regular.ttf',
          './assets/fonts/HarmonyOS_Sans_SC_Medium.ttf',
          './assets/fonts/HarmonyOS_Sans_SC_Bold.ttf',
        ],
        ios: {
          fonts: [
            './assets/fonts/Hack-Regular.ttf',
            './assets/fonts/Hack-Bold.ttf',
            './assets/fonts/Hack-Italic.ttf',
            './assets/fonts/Hack-BoldItalic.ttf',
            './assets/fonts/HarmonyOS_Sans_SC_Regular.ttf',
            './assets/fonts/HarmonyOS_Sans_SC_Medium.ttf',
            './assets/fonts/HarmonyOS_Sans_SC_Bold.ttf',
          ],
        },
      },
    ],
    'expo-secure-store',
    'expo-localization',
  ],
  runtimeVersion: {
    policy: 'appVersion',
  },
  scheme: 'com.lobehub.app',
  slug: 'lobe-chat-react-native',
  updates: {
    url: 'https://u.expo.dev/f02d6f4f-e042-4c95-ba0d-ac06bb474ef0',
  },
  userInterfaceStyle: 'automatic',
  version: '1.0.0',
  web: {
    bundler: 'metro',
    favicon: './assets/images/favicon.ico',
    output: 'static',
  },
});
