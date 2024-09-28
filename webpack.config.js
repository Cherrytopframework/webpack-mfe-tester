const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const Dotenv = require('dotenv-webpack');
const path = require('path');



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
                    }
                ]
            },
            { test: /\.(js|jsx)$/, use: 'babel-loader' },
            { test: /\.(ts|tsx)$/, use: 'ts-loader' },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolves these extensions
        alias: {},
    },
    devServer: {
        port: 8082
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new ModuleFederationPlugin({
            name: 'mf2',
            filename: "remoteEntry.js",
            remotes: {},
            exposes: {
                './Button': './src/Button.tsx',
                "./App": "./src/App/index.tsx",
                "./AdvancedCamera": "./src/components/custom/AdvancedCamera/AdvancedCamera.tsx",
                "./CherrytopFramework": "./src/Entry.tsx",
                "./AuthProvider": "./src/components/custom/Auth/Auth3.tsx",
                // app/AppProvider includes theme, alert, confirm, drawer providers
                "./AppProvider": "./src/components/custom/providers/Providers.tsx",
                "./AlertProvider": "./src/components/custom/providers/AlertProvider.tsx",
                "./ConfirmProvider": "./src/components/custom/providers/Confirm/ConfirmProvider.tsx",
                "./BottomNavigation": "./src/components/Mui/BottomNavigation/BottomNavigation.tsx",
                "./Camera": "./src/components/custom/Camera/Camera.tsx",
                "./ChatBox": "./src/components/custom/Chat/Chat.tsx",
                "./ChatView": "./src/components/custom/Chat/ChatView.tsx",
                "./chatScripts": "./src/components/custom/Chat/chatHelper.ts",
                "./ChartsContainer": "./src/components/custom/charts/ChartsWrapper.tsx",
                "./DrawerContainer": "./src/components/Mui/Drawer/Drawer.tsx",
                "./DateTimeLabel": "./src/components/custom/DateTimeLabel/DateTimeLabel.tsx",
                './DisplayCard': './src/components/Mui/DisplayCard/DisplayCard.tsx',                        
                "./FormContainer": "./src/components/custom/forms/FormContainer.tsx",
                "./FullScreenLoader": "./src/components/custom/Loader/FullScreen.tsx",
                "./Mui": "./src/components/Mui/Layout/index.ts",
                './List': './src/components/Mui/List/List.tsx',
                "./MarkdownWrapper": "./src/components/custom/wrappers/MarkdownWrapper/MarkdownWrapper.tsx",
                "./Navbar": "./src/components/Mui/Navbar/Navbar.tsx",
                "./NavMenu": "./src/components/Mui/Navbar/NavMenu.tsx",
                "./NotionDataWrapper": "./src/components/custom/NotionPage/NotionPage.tsx",
                "./NoRemoteEntry": "./src/components/custom/NoRemoteEntry/NoRemoteEntry.tsx",
                "./Planning": "./src/components/custom/Planning/PlanningPage.tsx",
                "./QueryWrapper": "./src/components/custom/wrappers/QueryWrapper/QueryWrapper.tsx",
                "./ReusablePopover": "./src/components/custom/ReusablePopover/ReusablePopover.tsx",
                "./ReusableTable": "./src/components/custom/charts/ReusableTable.tsx",
                "./Tabs": "./src/components/Mui/Tabs/Tabs.tsx",
                "./ThemeProvider": "./src/utilities/theme/index.ts",
                "./utilities/Logs": "./src/utilities/helpers/logs.ts",
                "./utilities/queries": "./src/utilities/api/index.ts",
                "./utilities/store": "./src/utilities/store/index.ts",
                "./utilities/store/utilityStore": "./src/utilities/store/utilityStore.ts"
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
                zustand: { 
                    singleton: true, 
                    requiredVersion: "^4.1.1" 
                }, // Share Zustand to ensure single store instance
            }
        }),
        new Dotenv({})
    ]
};
