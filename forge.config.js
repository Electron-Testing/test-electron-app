module.exports = {
  packagerConfig: {
    asar: true,
    osxSign: {
      optionsForFile: (filePath) => {
      // Here, we keep it simple and return a single entitlements.plist file.
      // You can use this callback to map different sets of entitlements
      // to specific files in your packaged app.
      return {
        entitlements: 'entitlements.mac.inherit.plist'
      };
    }}
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
