var path = require('path');

module.exports = {
    entry: [
        './src/index.jsx',
    ],
    resolve: {
        modules: [
            'src',
            'node_modules',
        ],
        extensions: ['*', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react',
                            [
                                "@babel/preset-env",
                                {
                                    "modules": "commonjs",
                                    "targets": {
                                        "node": "current"
                                    }
                                }
                            ]
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                  // style-loader
                  { loader: 'style-loader' },
                  // css-loader
                  {
                    loader: 'css-loader',
                    options: {
                      modules: true
                    }
                  }
                  
                ]
              }
        ],
    },
    externals: {
        react: 'React',
        redux: 'Redux',
        'react-redux': 'ReactRedux',
        'react-bootstrap': 'ReactBootstrap',
        'react-dom': 'ReactDOM',
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: 'main.js',
    },
};
