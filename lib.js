const jwt = require('jsonwebtoken');
exports.checkAuth = async (key, event) => {
    return new Promise((resolve, reject) => {
        if (event.Cookie) {
            if (event.Cookie['token']) {
                token = event.Cookie['token'];
            } else if (event.headers.Authorization) {
                token = event.headers.Authorization;
            } else {
                reject(new Error('no token'));
            }
        } else if (event.headers.Authorization) {
            token = event.headers.Authorization;
        } else {
            reject(new Error('no token'));
        }
        jwt.verify(token, key, function (err, decoded) {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};


exports.genErrorResponse = (code, msg) => {
    return {
        statusCode: code,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true,
		},
        body: JSON.stringify(
            {
                successful: false,
                error: msg,
            },
            null,
            2
        ),
    };
};

exports.genSuccResponse = (data) => {
    return {
        statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true,
		},
        body: JSON.stringify(
            {
                successful: true,
                data: data,
            },
            null,
            2
        ),
    };
};
