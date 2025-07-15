const crypto = require('crypto');

// 32 byte random string
const secret = crypto.randomBytes(64).toString('hex');

console.log('Generated secret:\n');
console.log(secret);