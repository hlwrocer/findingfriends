var path = require('path');
module.exports = {
	entry: './findingfriends/app.js',
	output: { 
		path: path.resolve(__dirname, 'dist'), 
		filename: 'bundle.js' 
	},
	resolveLoader: {
		modules: ['node_modules'],
		moduleExtensions: ['-loader']	
	},
	module:{
		rules: [
			{
				test: /\.js$/,
 				exclude: /node_modules/,
				loader:'babel-loader'
			}
		]
	}
};
