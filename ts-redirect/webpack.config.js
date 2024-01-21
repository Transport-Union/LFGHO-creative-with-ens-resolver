const path = require("path");
const webpack = require("webpack");
const isProduction = process.env.NODE_ENV == "production";

const config = (env) =>  {

  return {
    entry: {
      scaffold: {
        import: "./src/main.ts",
      },
    },
    output: {
      path: path.resolve(__dirname, "public/"),
      filename: 'scripts/[name].bundle.js',
      assetModuleFilename: (pathData) => {
        const filepath = path
            .dirname(pathData.filename)
            .split("/")
            .slice(1)
            .join("/");
        return `./styles/${filepath}/[name].[hash][ext][query]`;
      },
    },
    mode: 'development',
    optimization: {
      usedExports: false,
    },
    devServer: {
      open:false,
      port: 4444,
      hot: true,
      allowedHosts: "all",
      client: {
        overlay: true,
        progress: true,
        reconnect: true,
      },
    },
    devtool:'source-map',
    plugins: [],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/i,
          loader: "ts-loader",
          exclude: ["/node_modules/"],
        }
      ],
    },
    resolve: {
      modules: ['public/scripts','node_modules'],
      extensions: [".ts",".js"]
    }
  }
};

module.exports = (env) => {

  let c = config(env);

  if (isProduction) {
    c.mode = "production";
  } else {
    c.mode = "development";
  }
  return c;
};
