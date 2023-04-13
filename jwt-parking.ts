import * as jwt from 'jsonwebtoken';

const secretKey = 'my-secret-key-parking';
const payload = { username: 'parking' };
const options = { expiresIn: '1h' };

const token = jwt.sign(payload, secretKey, options);
console.log(token);