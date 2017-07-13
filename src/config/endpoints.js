import envConfig from 'envConfig';

const MAIN_APP_AUTHORITY = envConfig.MAIN_APP_AUTHORITY;

export default {

    // User info path
    USER_INFO_PATH: `${MAIN_APP_AUTHORITY}/api/users/me`,

    // User login path
    USER_LOGIN_PATH: `${MAIN_APP_AUTHORITY}/api/users/login`,

    // New user signup path
    USER_SIGNUP_PATH: `${MAIN_APP_AUTHORITY}/api/users`,

    // New list path
    NEW_LIST_PATH: `${MAIN_APP_AUTHORITY}/api/lists`,

    // Fetch lists path
    USERS_LISTS_PATH: `${MAIN_APP_AUTHORITY}/api/lists`,

    // Fetch shared lists path
    USERS_SHARED_LISTS_PATH: `${MAIN_APP_AUTHORITY}/api/lists/shared`,

    // List by id path
    LIST_ID_PATH: `${MAIN_APP_AUTHORITY}/api/lists/id/`,

};
