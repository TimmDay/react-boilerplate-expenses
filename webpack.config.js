const path = require('path'); //to get access to path.join()
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //require in the node version of import

module.exports = (env) => {

    const isProduction = (env === 'production');
    const CSSExtract = new ExtractTextPlugin('styles.css');

    console.log('env', env);

    return {
        mode: 'development',
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract
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