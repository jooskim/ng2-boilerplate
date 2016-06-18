const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'), CopyWebpackPlugin.default || CopyWebpackPlugin);
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
/*
 * Webpack Constants
 */
const METADATA = webpackMerge(commonConfig.metadata, {
	host: 'localhost',
	port: 3000,
	ENV: ENV
});

module.exports = webpackMerge(commonConfig, {
	metadata: METADATA,
	devtool: 'cheap-module-source-map',
	output: {
		path: helpers.root('build-dev'),
		filename: '[name].bundle.js',
		chunkFilename: '[id].chunk.js',
		sourceMapFilename: '[name].map'
	},
	plugins: [
		new DefinePlugin({
			'ENV': JSON.stringify(METADATA.ENV)
		}),
		new ForkCheckerPlugin(),
	    new webpack.optimize.OccurenceOrderPlugin(true),
	    new webpack.optimize.CommonsChunkPlugin({
	      name: ['polyfills', 'vendor'].reverse()
	    }),
	    new ExtractTextPlugin('assets/[name].css'),
	    new CopyWebpackPlugin([{
	      from: 'src/assets',
	      to: 'assets'
	    }], {
	      ignore: ['*.scss']
	    }),
	    new HtmlWebpackPlugin({
	      template: 'src/index.html',
	      chunksSortMode: 'dependency'
	    })
	],
	devServer: {
		port: METADATA.port,
		host: METADATA.host,
		historyApiFallback: true,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		},
		outputPath: helpers.root('build-dev')
	}
});