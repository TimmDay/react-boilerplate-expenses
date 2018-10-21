const path = require('path'); //to get access to path.join()
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin'); //require in the node version of import
const ExtractTextPlugin = require("extract-css-chunks-webpack-plugin"); // import (node syntax)


process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//process.env.NODE_ENV //production/test/undefined(dev)

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({path: '.env.test'});
    // require('dotenv').config({ path: '.env.development' }); //todo
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({path: '.env.development'});
}
// for production we must use the heroku command line interface
// heroku config
// heroku config:set KEY=value
// heroku config:unset KEY


module.exports = (env) => {
    const isProduction = (env === 'production');
    const CSSExtract = new ExtractTextPlugin({filename: 'styles.css'});

    return {
        mode: 'development',
        entry: ['babel-polyfill', './src/app.js'],
        // entry: './src/playground/consolelog.js',

        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        // plugins: [
        //     CSSExtract
        // ],
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [
                    ExtractTextPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    // {
                    //     loader: 'css-loader',
                    //     options: {
                    //         sourceMap: true
                    //     }
                    // },
                    // {
                    //     loader: 'sass-loader',
                    //     options: {
                    //         sourceMap: true
                    //     }
                    // }
                ]
            }]
        },
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            publicPath: '/dist/',
            historyApiFallback: true
        }
    }
};

// use: [
//     'style-loader',
//     'css-loader',
//     'sass-loader'
// ]

// CSSExtract.extract({
//     use: [
//         'css-loader',
//         'sass-loader'
//     ]
// })