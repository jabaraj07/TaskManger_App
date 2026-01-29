module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "module:metro-react-native-babel-preset",
      ["@babel/preset-env", { targets: { browsers: ["> 1%", "last 2 versions"] } }],
      "@babel/preset-react",
    ],
    plugins: [
      // other plugins if any
      "react-native-reanimated/plugin", // MUST be last
    ],
    env: {
      web: {
        presets: [
          ["@babel/preset-env", { targets: { browsers: ["> 1%", "last 2 versions"] } }],
          "@babel/preset-react",
        ],
      },
    },
  };
};
