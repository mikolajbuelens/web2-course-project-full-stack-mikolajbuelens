// webpack.config.js
const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
    class1: "./src/Article.js",
    class2: "./src/UserArticle.js",
    buttons: "./src/buttons.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
