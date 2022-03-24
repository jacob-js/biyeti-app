const users = {
    login: {
        loading: false,
        error: {},
        data: {}
    },
    signup: {
        loading: false,
        error: {},
        data: {}
    },
    currentUser: {
        loading: true,
        error: null,
        data: {},
        auth: null
    }
};

export default users