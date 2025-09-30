import Constants from 'expo-constants';

export type AppMode = 'dev' | 'test' | 'prod';

interface EnvironmentConfig {
  mode: AppMode;
  apiUrl: string;
}

const ENV_CONFIG: Record<AppMode, { apiUrl: string }> = {
  dev: {
    apiUrl: 'http://localhost:8080',
  },
  test: {
    apiUrl: 'https://test.marlin-live.com/api',
  },
  prod: {
    apiUrl: 'https://marlin-live.com/api',
  },
};

function getEnvironment(): EnvironmentConfig {
  const mode = (Constants.expoConfig?.extra?.appMode as AppMode) || 'test';

  return {
    mode,
    apiUrl: ENV_CONFIG[mode].apiUrl,
  };
}

export const ENV = getEnvironment();