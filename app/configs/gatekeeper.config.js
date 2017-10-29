module.exports = {
    token: {
        kind: 'jwt',
        options: {
            issuer: 'name-of-the-application',
            algorithm : 'RS256',
            secret: 'ssshhh',  // can replace with publicKey, privateKey properties
            issuer: 'gatekeeper',
            expiresIn: '1h'
        }
    }
};