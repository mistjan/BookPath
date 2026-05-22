const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
const { resolve } = require("metro-resolver");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// 监听整个 workspace
config.watchFolders = [workspaceRoot];

// 自定义模块解析：处理跨包引用
const originalResolve = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // 处理 @bookpath/* 别名
  if (moduleName === "@bookpath/content") {
    return {
      filePath: path.resolve(workspaceRoot, "packages/content/src/index.ts"),
      type: "sourceFile"
    };
  }
  if (moduleName === "@bookpath/core") {
    return {
      filePath: path.resolve(workspaceRoot, "packages/core/src/index.ts"),
      type: "sourceFile"
    };
  }
  if (moduleName === "@bookpath/design-tokens") {
    return {
      filePath: path.resolve(workspaceRoot, "packages/design-tokens/src/index.ts"),
      type: "sourceFile"
    };
  }

  // Handle absolute or relative paths that might point into the app directory
  if (moduleName.includes("apps/mobile/node_modules/")) {
     const normalizedName = moduleName.split("apps/mobile/node_modules/")[1];
     return (originalResolve || resolve)(context, normalizedName, platform);
  }

  // Use the original resolver if it exists, otherwise fall back to the default metro-resolver.
  // This avoids infinite recursion with context.resolveRequest.
  return (originalResolve || resolve)(context, moduleName, platform);
};


// node_modules 查找路径
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules")
];

config.resolver.disableHierarchicalLookup = false;


module.exports = config;
