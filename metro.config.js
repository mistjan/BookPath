const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

// Monorepo root metro.config.js
// Delegates to the actual config in apps/mobile/
const projectRoot = __dirname;
const appRoot = path.resolve(projectRoot, "apps/mobile");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [
  projectRoot,
  path.resolve(projectRoot, "packages"),
];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(appRoot, "node_modules"),
  path.resolve(projectRoot, "node_modules/react-native/node_modules"),
];

// 确保 packages/ 不被 blockList 排除
config.resolver.blockList = [];

// 从 apps/mobile/metro.config.js 同步的别名和自定义解析
const fs = require("fs");
const { resolve } = require("metro-resolver");

const EXTENSIONS = [".tsx", ".ts", ".jsx", ".js", ".json", ".mjs"];

function resolveWithExtension(basePath) {
  if (fs.existsSync(basePath)) return basePath;
  for (const ext of EXTENSIONS) {
    const withExt = basePath + ext;
    if (fs.existsSync(withExt)) return withExt;
    const index = path.join(basePath, "index" + ext);
    if (fs.existsSync(index)) return index;
  }
  return null;
}

const originalResolve = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // 处理 @/ 别名（解析扩展名后返回 sourceFile）
  if (moduleName.startsWith("@/")) {
    const basePath = path.resolve(appRoot, moduleName.slice(2)).split("\\").join("/");
    const resolvedPath = resolveWithExtension(basePath);
    if (resolvedPath) {
      return { filePath: resolvedPath, type: "sourceFile" };
    }
  }
  // 处理 @bookpath/* 别名
  if (moduleName === "@bookpath/content") {
    return {
      filePath: path.resolve(projectRoot, "packages/content/src/index.ts"),
      type: "sourceFile"
    };
  }
  if (moduleName === "@bookpath/core") {
    return {
      filePath: path.resolve(projectRoot, "packages/core/src/index.ts"),
      type: "sourceFile"
    };
  }
  if (moduleName === "@bookpath/design-tokens") {
    return {
      filePath: path.resolve(projectRoot, "packages/design-tokens/src/index.ts"),
      type: "sourceFile"
    };
  }
  return (originalResolve || resolve)(context, moduleName, platform);
};

config.resolver.disableHierarchicalLookup = false;

module.exports = config;
