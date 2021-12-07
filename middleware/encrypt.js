const crypto = require('crypto');

function encrypt(data, encryptKEY, iv) {
  //const strData = JSON.stringify(data);
  const keyEnc = Buffer.from(encryptKEY);
  const cipher = crypto.createCipheriv('aes-256-cbc', keyEnc, iv);
  let encrypted = cipher.update(data, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  //const ivtext = btoa(iv);
  const ivtext = Buffer.from(iv).toString('base64')
  return `${encrypted}---${ivtext}`;
  //return`${encrypted}---${iv}`
}

module.exports = encrypt;