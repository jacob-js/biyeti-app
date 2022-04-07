const tickets = {
    tickets: {
        data: [],
        loading: false,
        error: null
    },
    createTicket: {
        loading: false,
        error: null,
        data: {}
    },
    purchase: {
        loading: false,
        error: null,
        data: {},
        ticket: {}
    },
    userTickets: {
        loading: false,
        error: null,
        data: []
    }
};

export default tickets;