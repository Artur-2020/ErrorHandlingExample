class SendError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SendError';
        this.status = 200;
    }
}

class LogError extends Error {
    constructor(message) {
        super(message);
        this.name = 'LogError';
        this.status = 500;
    }
}

function CatchError(e, res) {
    if (e instanceof LogError) {
        console.log('Log Error', e.message, 'status ------>', e.status);
        return res.status(e.status).send({error: e.message});
    } else if (e instanceof SendError) {
        console.log('Send Error', e.message, 'status ------>', e.status);
        return res.status(e.status).send({error: e.message});
    } else {
        console.log('Other Error', e.message, 'status ------>', e.status || 500);
        return res.status(e.status || 500).send({error: "Something went wrong"});
    }
}

module.exports = {LogError, SendError, CatchError};