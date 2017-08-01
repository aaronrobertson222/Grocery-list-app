import createHistory from 'history/createHashHistory';

export default createHistory({
    basename: '',             // The base URL of the app (see below)
    hashType: 'slash',
});
