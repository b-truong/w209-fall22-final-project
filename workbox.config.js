module.exports = {
  InjectManifest: (options) => {
    options.maximumFileSizeToCacheInBytes = 30 * 1024 * 1024;
    return options;
  },
};
