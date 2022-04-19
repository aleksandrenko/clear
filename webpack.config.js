const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const chunksSortMode = function (chunk1, chunk2) {
  const orders = ['react'];
  const chunkName1 = chunk1.split('~').shift();
  const chunkName2 = chunk2.split('~').shift();
  const order1 = orders.indexOf(chunkName1);
  const order2 = orders.indexOf(chunkName2);
  if (order1 > order2) {
    return 1;
  } else if (order1 < order2) {
    return -1;
  } else {
    return 0;
  }
};

module.exports = {
  entry: './src/main.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    https: true,
    host: 'localhost',
    port: 3333,
    open: true,
    hot: false,
    historyApiFallback: true,
    client: {
      overlay: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'assets/images',
      // },
      // {
      //   test: /\.json5$/i,
      //   type: 'json',
      //   parser: {
      //     parse: json5.parse,
      //   },
      // },
      { test: /\.html$/, loader: 'html-loader' },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      chunksSortMode: chunksSortMode,
      minify: {
        minifyJS: true
      }
    }),
  ]
};
