import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.inoxtubi.app',
  appName: 'Inoxtubi',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#032641',
      showSpinner: true,
      spinnerColor: '#068ee2'
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#032641'
    }
  }
};

export default config;
