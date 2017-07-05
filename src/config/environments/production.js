import defaultConfig from 'config/environments/default';

const configuration = {
    ...defaultConfig,
    CONFIG_NAME: 'Production Config',
    MAIN_APP_AUTHORITY: 'https://grocery-list-app.herokuapp.com',
};

export default configuration;
