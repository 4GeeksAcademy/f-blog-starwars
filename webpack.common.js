const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: ["./src/js/index.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: "style-loader", // Crea nodos de estilo a partir de cadenas JS
          },
          {
            loader: "css-loader", // Traduce CSS a CommonJS
          },
        ],
      }, // Archivos CSS
      {
        test: /\.(png|svg|jpg|gif|jpeg|webp)$/,
        use: {
          loader: "file-loader",
          options: { name: "[name].[ext]" },
        },
      }, // Imágenes
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]", // Genera un nombre único para evitar problemas de caché
              outputPath: "fonts/", // Coloca las fuentes en una carpeta "fonts" dentro de "public"
            },
          },
        ],
      }, // Fuentes
      {
        test: /\.json$/,
        type: "javascript/auto",
        use: "json-loader",
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "4geeks.ico",
      template: "template.html",
    }),
    new Dotenv({ safe: true, systemvars: true }),
  ],
};
