'use strict';

let cors = require ('cors'),
    blueprint = require ('@onehilltech/blueprint');

const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'SEARCH']
};

module.exports = {

    '/v1': {
        policy: 'gatekeeper.auth.bearer',
        use: [
            cors (corsOptions),
        ]
    },

    '/gatekeeper': [
        cors (corsOptions),
        blueprint('router://@onehilltech/blueprint-gatekeeper:v1')
    ]
};