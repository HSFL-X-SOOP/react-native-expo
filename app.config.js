module.exports = ({ config }) => {
  const appMode = process.env.APP_MODE || 'test';

  return {
    ...config,
    extra: {
      ...config.extra,
      appMode: appMode,
    },
  };
};
