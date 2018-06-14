const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production'; // eslint-disable-line

module.exports = {
    entry: path.resolve(__dirname, 'src') + '/app.js', // eslint-disable-line
    output: {
        path: path.resolve(__dirname, 'build'), // eslint-disable-line
        filename: 'app.bundled.js'
    },
    mode: process.env.NODE_ENV, // eslint-disable-line
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    devtool: devMode ? 'cheap-module-eval-source-map' : '',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'), // eslint-disable-line
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loaders: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: devMode ? 'images/[name].[ext]' : '../images/[name].[ext]',
                            // name: 'images/[name].[ext]',
                            limit: 10000
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: process.env.NODE_ENV === 'production' && [ // eslint-disable-line
                                require('imagemin-gifsicle')({
                                    interlaced: false
                                }),
                                require('imagemin-mozjpeg')({
                                    progressive: true,
                                    arithmetic: false
                                }),
                                require('imagemin-pngquant')({
                                    floyd: 0.5,
                                    speed: 2
                                }),
                                require('imagemin-svgo')({
                                    plugins: [
                                        { removeTitle: true },
                                        { convertPathData: false }
                                    ]
                                })
                            ]
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'images': path.resolve(__dirname, 'src/images') // eslint-disable-line
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: devMode ? 'index.html' : '../index.html'
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '../css/[name].min.css',
            chunkFilename: '[id].css'
        })
    ]
};