'use strict';

let cors = require ('cors'),
    blueprint = require ('@onehilltech/blueprint');

const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'SEARCH']
};

module.exports = {
    '/v1': [
        cors(corsOptions),
    ],
   
    '/gatekeeper': [
        cors (corsOptions),
        blueprint('router://@onehilltech/blueprint-gatekeeper:v1')
    ]
};