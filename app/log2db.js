const Logs = require('./model/log');

let log2db = (msg, level, info) => {
    let log = {
        level: level || 'info',
        message: msg,
        info: {
            method: info.method,
            url: info.url,
            costTime: info.costTime,
            body: JSON.stringify(info.body),
            response: {
                status: info.response.status,
                message: info.response.message,
                header: JSON.stringify(info.response.header),
                body: JSON.stringify(info.response.body)
            }
        }
    };
    Logs.create(log, (err) => {
        if(err) {throw new Error(err);}
    });
};
module.exports = log2db;