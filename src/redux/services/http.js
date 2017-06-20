import request from 'isomorphic-fetch';

const fetch = (url, opts, anonymous = false) => {
    const newOpts = {
        ...opts,
    };

    if (anonymous) {
        newOpts.headers = {
            ...newOpts.headers,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
    } else {
        const tokenContent = sessionStorage.getItem('Token');
        newOpts.headers = {
            ...newOpts.headers,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `JWT ${tokenContent}`,
        };
    }
    return request(url, newOpts);
};

export default fetch;
