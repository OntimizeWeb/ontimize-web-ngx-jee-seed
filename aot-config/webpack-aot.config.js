const helpers = require('./helpers');
const path = require('path');
const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ngToolsWebpack = require('@ngtools/webpack');
const { GlobCopyWebpackPlugin } = require('@angular/cli/plugins/webpack');
const CompressionPlugin = require("compression-webpack-plugin");

const config = {
  entry: {
    main: helpers.root('tmp-src/main-aot.ts'),
    polyfills: helpers.root('tmp-src/polyfills.ts'),
    vendor: helpers.root('tmp-src/vendor-aot.ts'),
    scripts: APP_SCRIPTS
  },

  output: {
    path: helpers.root('dist'),
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js'
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    rules: [
      { test: /\.ts$/, loader: '@ngtools/webpack', exclude: /\.node_modules/ },
      { test: /\.(html|css)$/, loader: 'raw-loader', exclude: /\.async\.(html|css)$/ },
      { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] }
    ]
  },
  plugins: [
    new ProgressPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['main', 'scripts', 'vendor', 'polyfills']
    }),

    new CommonsChunkPlugin({
      "name": ["inline"],
      "minChunks": null
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function (module) {
        return module.context && module.context.indexOf("node_modules") !== -1;
      },
      "chunks": ["main"]
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),

    new webpack.optimize.CommonsChunkPlugin({
      "name": ["main"],
      "minChunks": 2,
      "async": "common"
    }),

    new ngToolsWebpack.AotPlugin({
      tsConfigPath: helpers.root('tsconfig.aot.json'),
      entryModule: helpers.root('tmp-src/app/app.module#AppModule')
    }),

    new HtmlWebpackPlugin({
      template: helpers.root('aot-config/index.ejs')
    }),

    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      beautify: false,
      output: {
        comments: false
      },
      mangle: {
        keep_fnames: true,
        screw_ie8: true
      },
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false // we need this for lazy v8
      }
    }),

    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),

    new GlobCopyWebpackPlugin({
      "patterns": [
        "assets/css/loader.css",
        "assets/i18n",
        "assets/images",
        "favicon.ico",
        {
          "glob": "**/*",
          "input": "../node_modules/flag-icon-css/flags/",
          "output": "./assets/flags"
        }
      ],
      "globOptions": {
        "cwd": path.join(process.cwd(), "src"),
        "dot": true,
        "ignore": "**/.gitkeep"
      }
    })
  ]
};

module.exports = config;
