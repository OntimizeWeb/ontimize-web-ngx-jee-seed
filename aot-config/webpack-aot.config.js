var AngularCompilerPlugin = require("@ngtools/webpack").AngularCompilerPlugin;
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");
var ProgressPlugin = require("webpack/lib/ProgressPlugin");
var GlobCopyWebpackPlugin = require("copy-webpack-plugin");

var webpack = require("webpack");
var helpers = require("./helpers");

module.exports = {
  mode: "production",
  devtool: "nosources-source-map",

  entry: {
    main: helpers.root("tmp-src/main.ts"),
    polyfills: helpers.root("tmp-src/polyfills.ts")
  },

  output: {
    path: helpers.root("dist"),
    filename: "[name].[chunkhash].js"
  },

  resolve: {
    extensions: [".js", ".ts"]
  },

  module: {
    rules: [
      // I provide a TypeScript compiler that performs Ahead of Time (AoT)
      // compilation for the Angular application and TypeScript code.
      {
        test: /(\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: "@ngtools/webpack",
        exclude: /\.node_modules/
      },
      // When the @ngtools webpack loader runs, it will replace the @Component()
      // "templateUrl" and "styleUrls" with inline "require()" calls. As such, we
      // need the raw-loader so that require() will know how to load .htm and .css
      // files as plain-text.
      { test: /\.(html|css)$/, loader: "raw-loader", exclude: /\.async\.(html|css)$/ },
      { test: /\.scss$/, loaders: ["raw-loader", "sass-loader"] }
    ]
  },

  optimization: {
    splitChunks: {
      // Apply optimizations to all chunks, even initial ones (not just the
      // ones that are lazy-loaded).
      chunks: "all",
      cacheGroups: {
        commons: { test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all" }
      }
    },
    // I pull the Webpack runtime out into its own bundle file so that the
    // contentHash of each subsequent bundle will remain the same as long as the
    // source code of said bundles remain the same.
    // runtimeChunk: "single"
    runtimeChunk: true
  },
  plugins: [
    new GlobCopyWebpackPlugin([
      { context: "src", from: "assets/css/**/*", to: "./", ignore: ["app.scss"] },
      { context: "src", from: "assets/i18n/**/*", to: "./" },
      { context: "src", from: "assets/images/**/*", to: "./" },
      { from: "src/favicon.ico", to: "./" }
    ]),

    new ProgressPlugin(),

    new AngularCompilerPlugin({
      tsConfigPath: helpers.root("tsconfig.aot.json"),
      mainPath: helpers.root("tmp-src/main.ts"),
      sourceMap: true
    }),

    new HtmlWebpackPlugin({
      template: helpers.root("aot-config/index.ejs"),
      chunksSortMode: "manual",
      chunks: ["polyfills", "vendors", "main"]
    }),

    new webpack.HashedModuleIdsPlugin(),

    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};
