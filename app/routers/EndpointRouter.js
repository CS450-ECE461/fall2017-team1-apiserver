// app/routers/EndpointRouter.js
const blueprint = require ('@onehilltech/blueprint')
;

module.exports = exports = {
    '/gatekeeper': blueprint ('router://@onehilltech/blueprint-gatekeeper:v1')
};

// need to give ember js my client-id

// ember-gatekeeper takes care of the request.