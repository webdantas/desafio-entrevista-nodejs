require('dotenv').config();
import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;
const payload = { username: 'parking' };
const options = { expiresIn: process.env.EXPIRATION_TIME };

const token = jwt.sign(payload, secretKey, options);
console.log(token);
