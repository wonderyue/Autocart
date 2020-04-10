const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.s[a|c]ss$/,
        loader: "sass-loader!style-loader!css-loader",
      },
      {
        test: /\.(jpg|png|gif|jpeg|woff|woff2|eot|ttf|svg|ico)$/,
        loader: "url-loader",
        options: {
          esModule: false,
          name: "img/[name]-[hash:8].[ext]",
          limt: 8192,
        },
      },
    ],
  },
  plugins: [],
  watch: true,
};
