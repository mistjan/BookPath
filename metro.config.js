const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

// Monorepo root metro.config.js
// Delegates to the actual config in apps/mobile/
const projectRoot = __dirname;
const appRoot = path.resolve(projectRoot, "apps/mobile");

const config = getDefaultConfig(appRoot);

config.watchFolders = [projectRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(appRoot, "node_modules"),
];

module.exports = config;
