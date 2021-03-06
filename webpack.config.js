const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'src/main.js'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public'),
	},
	devtool: 'source-map',
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		compress: true,
		watchContentBase: true,
	}
};