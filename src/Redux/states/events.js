const events = {
    events: {
        loading: true,
        data: {},
        rows: [],
        count: 0
    },
    createEvent: {
        loading: false,
        error: null,
        data: {}
    },
    categorys: {
        loading: false,
        data: [],
        error: null
    },
    event: {
        loading: false,
        error: null,
        data: {}
    },
    updateEvent: {
        loading: false,
        error: null,
        data: {}
    },
    deleteEvent: {
        loading: false,
        error: null,
        msg: null,
        id: null
    }
};

export default events