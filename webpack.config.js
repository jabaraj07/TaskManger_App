const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './index.web.js',
  mode: isDevelopment ? 'development' : 'production',
  output: {
    path: path.resolve(__dirname, 'web-build'),
    filename: 'bundle.js',
    publicPath: '/',
    environment: {
      arrowFunction: false, // Support older browsers
      const: false,
    },
  },
  resolve: {
    extensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-linear-gradient': path.resolve(__dirname, 'src/web/LinearGradient.web.tsx'),
    },
    fullySpecified: false, // Allow imports without file extensions for ES modules
    mainFields: ['browser', 'module', 'main'],
    fallback: {
      // Provide polyfills for Node.js modules if needed
    },
  },
  resolveLoader: {
    fullySpecified: false,
  },
  experiments: {
    topLevelAwait: true,
  },
  module: {
    rules: [
      // Fix gesture-handler web component - handle undefined positions access
      {
        test: /node_modules[\\/]react-native-gesture-handler[\\/]lib[\\/]module[\\/]components[\\/]GestureComponents\.web\.js$/,
        use: [
          {
            loader: 'string-replace-loader',
            options: {
              search: /(RNDrawerLayoutAndroid|UIManager\.getViewManagerConfig\([^)]+\))\.positions/g,
              replace: (match, p1) => {
                if (p1.includes('UIManager.getViewManagerConfig')) {
                  return `((UIManager.getViewManagerConfig && ${p1}) || {}).positions || {}`;
                }
                return `(${p1} || {}).positions || {}`;
              },
              flags: 'g',
            },
          },
        ],
      },
      // Handle AsyncStorage - fix import paths and process as CommonJS
      {
        test: /node_modules[\\/]@react-native-async-storage[\\/]async-storage[\\/]lib[\\/]module[\\/]index\.js$/,
        use: {
          loader: 'string-replace-loader',
          options: {
            search: /from ['"]\.\/(AsyncStorage|hooks)['"]/g,
            replace: (match, p1) => `from './${p1}.js'`,
            flags: 'g',
          },
        },
        type: 'javascript/auto', // Preserve CommonJS
      },
      {
        test: /\.(js|mjs)$/,
        include: /node_modules[\\/]@react-native-async-storage[\\/]async-storage[\\/]lib[\\/]module/,
        type: 'javascript/auto', // Preserve CommonJS for webpack
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'Screen'),
          path.resolve(__dirname, 'Navigation'),
          path.resolve(__dirname, 'App.tsx'),
          path.resolve(__dirname, 'AuthContext.tsx'),
          path.resolve(__dirname, 'TaskContext.tsx'),
          path.resolve(__dirname, 'index.web.js'),
          // Include specific react-native packages that need transpilation
          /node_modules[\\/]react-native-/,
          /node_modules[\\/]@react-native/,
          /node_modules[\\/]react-native-reanimated/,
          /node_modules[\\/]react-native-linear-gradient/,
          /node_modules[\\/]react-native-vector-icons/,
          /node_modules[\\/]react-native-gesture-handler/,
          // AsyncStorage is handled separately above
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { 
                targets: { browsers: ['> 1%', 'last 2 versions'] },
                modules: false, // Let webpack handle modules
              }],
              '@babel/preset-react',
              'module:metro-react-native-babel-preset',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              'react-native-reanimated/plugin',
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    // Define React Native globals
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(isDevelopment),
      'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
    }),
    // Inject gesture-handler polyfill at the very beginning
    new webpack.BannerPlugin({
      banner: fs.readFileSync(path.resolve(__dirname, 'src/web/gestureHandlerPolyfill.web.js'), 'utf8'),
      raw: true,
      entryOnly: true,
    }),
    // Custom plugin to fix gesture-handler web component
    new (class GestureHandlerFixPlugin {
      apply(compiler) {
        compiler.hooks.compilation.tap('GestureHandlerFixPlugin', (compilation) => {
          compilation.hooks.buildModule.tap('GestureHandlerFixPlugin', (module) => {
            if (
              module.resource &&
              module.resource.includes('GestureComponents.web.js') &&
              module.resource.includes('react-native-gesture-handler')
            ) {
              const originalSource = module._source;
              if (originalSource && originalSource._value) {
                let source = originalSource._value;
                
                // Fix RNDrawerLayoutAndroid.positions
                source = source.replace(
                  /RNDrawerLayoutAndroid\.positions/g,
                  '(RNDrawerLayoutAndroid && RNDrawerLayoutAndroid.positions ? RNDrawerLayoutAndroid.positions : {})'
                );
                
                // Fix UIManager.getViewManagerConfig(...).positions
                source = source.replace(
                  /UIManager\.getViewManagerConfig\(([^)]+)\)\.positions/g,
                  '((UIManager.getViewManagerConfig && UIManager.getViewManagerConfig($1)) || {}).positions || {}'
                );
                
                module._source._value = source;
              }
            }
          });
        });
      }
    })(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
};

