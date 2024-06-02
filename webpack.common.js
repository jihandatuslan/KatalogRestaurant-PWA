const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageminWebpackPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");
const path = require("path");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/scripts/index.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/templates/index.html"),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/"),
          to: path.resolve(__dirname, "dist/"),
        },
      ],
    }),
    // eslint-disable-next-line no-undef
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: "./sw.bundle.js",
      runtimeCaching: [
        {
          urlPattern: /https:\/\/restaurant-api.dicoding.dev/,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "api-cache",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 72 * 60 * 60,
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
    }),

    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
  ],
};
