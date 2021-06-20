const path = require('path')
const webpack = require('webpack')

module.exports = (env) => ({
    devtool: false,
    mode: 'production',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: 'index.js',
        globalObject: 'this',
        library: 'library',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
        umdNamedDefine: true,
    },
    resolve: {
        extensions: [ '.ts', '.js', '.tsx' ],
    },
})
