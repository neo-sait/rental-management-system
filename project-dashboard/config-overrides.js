const webpack = require('webpack');
module.exports = function override(config) {
const fallback = config.resolve.fallback || {
    "crypto": require.resolve("crypto-browserify"),
"stream": require.resolve("stream-browserify"),
"assert": require.resolve("assert"),
"http": require.resolve("stream-http"),
"https": require.resolve("https-browserify"),
"os": require.resolve("os-browserify"),
"url": require.resolve("url"),
"fs": require.resolve("fs"),
"buffer": require.resolve("buffer"),


};



config.plugins.push(
    new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
    }),
    new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
        const mod = resource.request.replace(/^node:/, "");
        switch (mod) {
            case "buffer":
                resource.request = "buffer";
                break;
            case "stream":
                resource.request = "readable-stream";
                break;
            default:
                throw new Error(`Not found ${mod}`);
        }
    }),
);
config.ignoreWarnings = [/Failed to parse source map/];
return config; }