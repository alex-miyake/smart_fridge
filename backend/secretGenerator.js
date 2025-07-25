const crypto = require('crypto');

// random string
const secret = crypto.randomBytes(64).toString('hex');

console.log('Generated secret:\n');
console.log(secret);