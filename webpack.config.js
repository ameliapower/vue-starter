const webpack = require('webpack'),
	  path = require('path'),
	  HtmlWebpackPlugin = require('html-webpack-plugin'),
	  CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
	app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
	contentBase: path.join(__dirname, "dist"),
	port: 8080
  },
  module: {
	rules: [
	  { 
	  	test: /\.vue$/,
        loader: 'vue-loader'
	  },
	  {
	   test: /\.css$/,
	  	use: [
	  	  'style-loader',
	  	  'css-loader'
	  	]
	  },
	  {
	   test: /\.scss$/,
	   use: [
	  	 {loader: "style-loader"},
	  	 {loader: "css-loader"},
	  	 {loader: "sass-loader"}
	   ]
	  },
	  {
	  	test: /\.js$/,
	    exclude: /(node_modules|bower_components)/,
	    use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['@babel/preset-env']
	        }
	    }
	  },
	  {
       test: /\.(png|svg|jpe?g|gif)$/,
		 use: [
		    'file-loader',
			{
			  loader: 'image-webpack-loader',
			  options: {
			    // bypassOnDebug: true,
			    mozjpeg: {
			      progressive: true,
			      quality: 65
			    },
			    // optipng.enabled: false will disable optipng
			    optipng: {
			      enabled: false,
			    },
			    pngquant: {
			      quality: '65-90',
			      speed: 4
			    },
			    gifsicle: {
			      interlaced: false,
			    },
			    // the webp option will enable WEBP
			    webp: {
			      quality: 75
			    }
			  } //options
			} 
		  ]
	  	}, //file-loader
		{
		 test: /\.(woff|woff2|eot|ttf|otf)$/,
           use: [
			'file-loader'
		   ]
        }
	] //rules
   }, //modules
   resolve: {
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js'
      'vue$': 'vue/dist/vue.js'
    }
   },
   plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([{
      from: './src/vendor/*.css',
      to: './vendor/*.css'
    }]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
   ] //plugins
};