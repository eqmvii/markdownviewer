var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/app/index.html', // current HTML file
	filename: 'index.html', // name of the newly created HTML file
	inject: 'body'
});

module.exports = {
	entry: __dirname + '/app/index.js', //where it will go
	module: {
		loaders: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}
		]
	},
	output: {
		filename: 'transformed.js',
		path: __dirname //where it will go
	},
	plugins: [HTMLWebpackPluginConfig]
};
