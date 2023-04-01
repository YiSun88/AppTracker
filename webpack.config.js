const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    // The '/' at the end is required for generate correct URLs for the assts like font files during production
    publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '',
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
        ],
      },
      // Asset Modules setup to store font files separately in the font subdirectory
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'font/[hash][ext][query]',
        },
      },
      // Asset Modules setup for .jpg images
      {
        test: /\.jpg$/i,
        type: 'asset/resource',
        generator: {
          filename: 'image/[hash][ext][query]',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    open: true,
    /*
     * The previous history page will be served in place of any 404 responses.
     * To allow working with nodemon backend server.
     */
    historyApiFallback: true,
    proxy: {
      '/apps': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
    },
  },
};
