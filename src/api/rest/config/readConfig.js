const fs = require('fs');
const { getAccessKey } = require('../../../helpers/env');

module.exports = (req, res) => {
    // when ACCESS_KEY is not defined, we don't need to authorize
    if (!getAccessKey() || `Bearer ${getAccessKey()}` === req.headers.authorization) {
        fs.readFile('./src/api/rest/config/config.json', 'utf8', (err, jsonString) => {
            if (err) {
            // eslint-disable-next-line no-console
                console.log('File read failed:', err);
                res.status(500).json(err);
                return;
            }
            let response = JSON.parse(jsonString);
            if (req.query.field) {
                const field = req.query.field.split(',');
                const tempResponse = {};
                field.forEach((element) => {
                    if (response.storeConfig && response.storeConfig[element]) {
                        tempResponse[element] = response.storeConfig[element];
                    }
                });
                response = tempResponse;
            }
            res.status(200).json(response);
        });
    } else {
        res.status(403).json({ message: 'Token Invalid' });
    }
};
