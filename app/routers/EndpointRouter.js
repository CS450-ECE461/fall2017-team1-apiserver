'use strict';

let cors = require ('cors'),
    blueprint = require ('@onehilltech/blueprint');

const corsOptions = {
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'SEARCH']
};

module.exports = {

    '/v1': {
        policy: 'gatekeeper.auth.bearer',
        use: [
            cors (corsOptions),
        ]
    },

    '/gatekeeper': blueprint ('router://@onehilltech/blueprint-gatekeeper:v1')
};