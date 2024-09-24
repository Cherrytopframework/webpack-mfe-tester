const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const DotenvWebpack = require('dotenv-webpack');
const path = require('path');


// const deps = require("./package.json").dependencies;

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
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        host: "./dist",
        port: 8080,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
        }
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new ModuleFederationPlugin({
            name: 'mf2',
            filename: "remoteEntry.js",
            remotes: {
                tester: 'tester@http://localhost:8081/remoteEntry.js', //http://localhost:3000/mf-manifest.json
                // federation_provider: 'federation_provider@http://localhost:3000/remoteEntry.js',
                // app: 'app@https://cherrytopframework.netlify.app/remoteEntry.js',
                // openfitness: "http://localhost:4173/assets/remoteEntry.js",
            },
            exposes: {
                './Button': './src/Button.tsx',
            },
            shared: {
                react: { singleton: true },
                "react-dom": { singleton: true },
                zustand: { singleton: true, eager: true },
            },
        }),
        new DotenvWebpack(),
        // new ModuleFederationPlugin({
        //     name: "mf2",
        //     library: { type: "module" },
        //     filename: "remoteEntry.js",
        //     remotes: {
        //         app: 'app@https://cherrytopframework.netlify.app/remoteEntry.js',
        //         openfitness: "http://localhost:4173/assets/remoteEntry.js",
        //     },
        //     exposes: {},
        //     shared: {
        //         // ...deps,
        //         react: {
        //             singleton: true,
        //             requiredVersion: deps.react,
        //         },
        //         "react-dom": {
        //             singleton: true,
        //             requiredVersion: deps["react-dom"],
        //         },
        //     },
        // }),
    ],
};
