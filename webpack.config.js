const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const DotenvWebpack = require('dotenv-webpack');
const path = require('path');

// import HtmlWebpackPlugin from "html-webpack-plugin";
// import webpack from "webpack";
// import DotenvWebpack from "dotenv-webpack";
// import path from "path";

const { dependencies } = require("./package.json");
//@ts-ignore
// import packages from "./package.json" assert { type: "json" };
// const { dependencies } = packages;


module.exports = {
    entry: "./src/index.ts",
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'modules.bundle.js',
    },
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    // { loader: 'sass-loader' }, 
                ]
            },
            { test: /\.(js|jsx)$/, use: 'babel-loader' },
            { test: /\.(ts|tsx)$/, use: 'ts-loader' },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolves these extensions
        alias: {
            // Set up aliases
            // components: path.resolve(__dirname, 'src/components/'),
            // store: path.resolve(__dirname, 'src/utilities/store/'),
        },
    },
    // experiments: {
    //     outputModule: true,
    // },
    devServer: {
        // static: {
        //     directory: path.join(__dirname, "public"),
        // },
        // host: "./dist",
        port: 8082,
        // headers: {
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Methods": "*",
        //     "Access-Control-Allow-Headers": "*"
        // }
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new ModuleFederationPlugin({
            name: 'mf2',
            filename: "remoteEntry.js",
            remotes: {
                // webpack app
                tester: 'tester@http://localhost:8081/remoteEntry.js',
                // rspack app
                app: 'app@http://localhost:8080/mf-manifest.js',
                // vite app
                // openfitness: "http://localhost:4173/assets/remoteEntry.js",
            },
            exposes: {
                './Button': './src/Button.tsx',
            },
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: "^18.3.1"
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: "^18.3.1"
                },
                // For advanced/complex state management
                // zustand: { singleton: true, requiredVersion: "^4.1.1" }, // Share Zustand to ensure single store instance
            },
        }),
        new DotenvWebpack({}),
        // new ModuleFederationPlugin({
        //     name: "mf2",
        //     // library: { type: "module" },
        //     filename: "remoteEntry.js",
        //     remotes: {
        //         tester: 'tester@http://localhost:8081/remoteEntry.js', //http://localhost:3000/mf-manifest.json
        //         // app: 'app@https://cherrytopframework.netlify.app/remoteEntry.js',
        //         // openfitness: "http://localhost:4173/assets/remoteEntry.js",
        //     },
        //     // exposes: {
        //     //     './Button': './src/Button.tsx',
        //     // },
        //     shared: {
        //         // ...dependencies,
        //         react: {
        //             singleton: true,
        //             requiredVersion: dependencies.react,
        //         },
        //         "react-dom": {
        //             singleton: true,
        //             requiredVersion: dependencies["react-dom"],
        //         },
        //     },
        // }),
    ],
};
