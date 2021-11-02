module.exports = {
  stories: ['../test/storybook/**/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: config => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[local]--[hash:base64:5]',
            },
          },
        },
        'sass-loader',
      ],
    });

    return config;
  },
};
