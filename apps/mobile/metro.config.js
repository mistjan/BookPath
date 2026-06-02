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
  // 辅助函数：将绝对路径转为相对导入文件的路径，委托给原解析器
  // 避免直接返回 filePath 导致 Metro 无法计算 SHA-1
  const resolveAsRelative = (absPath) => {
    const originDir = context.originModulePath
      ? path.dirname(context.originModulePath)
      : projectRoot;
    let rel = path.relative(originDir, absPath);
    if (!rel.startsWith(".")) rel = "./" + rel;
    return (originalResolve || resolve)(context, rel.replace(/\\/g, "/"), platform);
  };

  // 处理 @/ 别名
  if (moduleName.startsWith("@/")) {
    const fullPath = path.resolve(projectRoot, moduleName.slice(2));
    return resolveAsRelative(fullPath);
  }
  // 处理 @bookpath/* 别名
  if (moduleName === "@bookpath/content") {
    return resolveAsRelative(path.resolve(workspaceRoot, "packages/content/src/index.ts"));
  }
  if (moduleName === "@bookpath/core") {
    return resolveAsRelative(path.resolve(workspaceRoot, "packages/core/src/index.ts"));
  }
  if (moduleName === "@bookpath/design-tokens") {
    return resolveAsRelative(path.resolve(workspaceRoot, "packages/design-tokens/src/index.ts"));
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
  path.resolve(workspaceRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules/react-native/node_modules"),
];

config.resolver.disableHierarchicalLookup = false;


module.exports = config;
