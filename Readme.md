# TicTacToe React
A simple TicTacToe Game made in React.

### Focused Concepts:
- Components, props, and state - Thinking in React
- Lifting state up/down 
- Most common techniques in React development
- useState() Hook

### Environment Setup
- You can simply use ``` npx create-react-app my-react-app ```
- But for robust understanding we followed manual installation as:
    - Initialize a new npm project ``` npm init -y ```
    - Install the necessary React packages ``` npm install react react-dom ```
    - Set Up Webpack and Babel: ``` npm install --save-dev webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin html-loader```
    - Create a `webpack.config.js` file in the root directory of your project:
        ``` 
        const path = require('path');
        const HtmlWebpackPlugin = require('html-webpack-plugin');

        module.exports = {
        entry: './src/index.js',
        output: {
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
                },
            },
            {
                test: /\.html$/,
                use: [
                {
                    loader: 'html-loader',
                },
                ],
            },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
            template: './src/index.html',
            }),
        ],
        devServer: {
            static: {
            directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 9000,
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        }; 
        ```
    - Create a `.babelrc` file in the root directory: ``` { "presets": ["@babel/preset-env", "@babel/preset-react"] } ```
    - Add the following scripts to your `package.json`: 
        ``` 
        "scripts": {
            "start": "webpack serve --mode development",
            "build": "webpack --mode production"
        } 
        ```
    - Create a `src` directory and add `index.js` and `index.html` files inside it.
    - To start: ``` npm start ```
 

