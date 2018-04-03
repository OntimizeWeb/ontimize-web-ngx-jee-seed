const helpers = require('./helpers');
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ModuleConcatenationPlugin = webpack.optimize.ModuleConcatenationPlugin;
const NoEmitOnErrorsPlugin = webpack.NoEmitOnErrorsPlugin;
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const { GlobCopyWebpackPlugin } = require('@angular/cli/plugins/webpack');

module.exports = {

  entry: {
    main: helpers.root('tmp-src/main.ts'),
    polyfills: helpers.root('tmp-src/polyfills.ts'),
    vendor: helpers.root('tmp-src/vendor-aot.ts')
  },

  output: {
    path: helpers.root('dist'),
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    // chunkFilename: '[id].[chunkhash].chunk.js',
    chunkFilename: '[name].[chunkhash].chunk.js'
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

    new NoEmitOnErrorsPlugin(),

    new GlobCopyWebpackPlugin({
      "patterns": [
        "assets/css/loader.css",
        "assets/i18n",
        "assets/images",
        "favicon.ico"
      ],
      "globOptions": {
        "cwd": path.join(process.cwd(), "src"),
        "dot": true,
        "ignore": "**/.gitkeep"
      }
    }),

    new ProgressPlugin(),

    new CommonsChunkPlugin({
      name: ['main', 'vendor', 'polyfills']
    }),
    // , 'scripts'

    new CommonsChunkPlugin({
      "name": [
        "inline"
      ],
      "minChunks": null
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function (module) {
        return module.context && module.context.indexOf("node_modules") !== -1;
      },
      "chunks": [
        "main"
      ]
    }),

    new CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),

    new CommonsChunkPlugin({
      "name": [
        "main"
      ],
      "minChunks": 2,
      "async": "common"
    }),

    new AngularCompilerPlugin({
      mainPath: helpers.root('tmp-src/main.ts'),
      tsConfigPath: helpers.root('tsconfig.aot.json')
    }),

    new HtmlWebpackPlugin({
      template: helpers.root('aot-config/index.ejs')
    }),

    new ModuleConcatenationPlugin(),

    new UglifyJsPlugin({
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
    })
  ]
};
