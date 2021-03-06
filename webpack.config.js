var path = require('path');

module.exports = {
  context: __dirname,
  entry: './frontend/stravaClone.jsx',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      },
      {
        test: /\.svg$/,
          exclude: /node_modules/,
          use: {
            loader: 'svg-react-loader',
            options: {
              tag: 'symbol',
              attrs: {
                title: 'example',
              },
              name: 'MyIcon',
            },
          },
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};
