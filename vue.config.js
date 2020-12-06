module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap(
        (args) => {
          args[0].title = 'Coomeet Home Task';
          return args;
        },
      );
  },
};
