import envConfig from 'envConfig';

const MAIN_APP_AUTHORITY = envConfig.MAIN_APP_AUTHORITY;

export default {

    //user info path
    USER_INFO_PATH: `${MAIN_APP_AUTHORITY}/api/users/me`,

    // user login path
    USER_LOGIN_PATH: `${MAIN_APP_AUTHORITY}/api/users/login`,

    // new user signup path
    USER_SIGNUP_PATH: `${MAIN_APP_AUTHORITY}/api/users`,

    // new list path
    NEW_LIST_PATH: `${MAIN_APP_AUTHORITY}/api/lists`,

    // fetch lists path
    USERS_LISTS_PATH: `${MAIN_APP_AUTHORITY}/api/lists`,

    // fetch shared lists path
    USERS_SHARED_LISTS_PATH: `${MAIN_APP_AUTHORITY}/api/lists/shared`,

    // list by id path
    LIST_ID_PATH: `${MAIN_APP_AUTHORITY}/api/lists/id/`,

};
