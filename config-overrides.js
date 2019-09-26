/* eslint-disable */
const { injectBabelPlugin } = require("react-app-rewired");
const fs = require("fs");
const path = require("path");
const rewireLess = require("react-app-rewire-less");
const lessToJs = require("less-vars-to-js");

const themeOverrides = lessToJs(fs.readFileSync(path.join(__dirname, "./src/style/antd-theme.less"), 'utf8'));

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", libraryDirectory: "es", style: true }], // change importing css to less
    config
  );
  config = rewireLess.withLoaderOptions({
    modifyVars: themeOverrides,
    javascriptEnabled: true
  })(config, env);

  return config;
};
