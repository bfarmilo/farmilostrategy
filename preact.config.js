// preact.config.js

export default function (config, env, helpers) {
    config.node.process = true;
    config.node.Buffer = true;
    if (env.production) {
      config.output.publicPath = '/home/';
      // Make async work
      //let babel = config.module.loaders.filter(loader => loader.loader === 'babel-loader')[0].options;
      // Blacklist regenerator within env preset:
      //babel.presets[0][1].exclude.push('transform-async-to-generator');
      // Add fast-async
      //babel.plugins.push([require.resolve('fast-async'), { spec: true }]);
    }
    //config.plugins.push(defineConstants({ PUBLIC_PATH }))
  }