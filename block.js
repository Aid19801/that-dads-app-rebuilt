// const SHA256 = require('crypto-js/sha256');

// class EncryptInfo {
//     constructor(timestamp, password) {
//         this.index = 0;
//         this.timestamp = timestamp;
//         this.password = password;
//         this.hash = this.calculateHash();
//     }

//     calculateHash() {
//         return SHA256(this.index + this.timestamp + this.password).toString();
//     }

//     mineBlock(difficulty) {

//     }
// }

// const x = new EncryptInfo(1542143808444, 'London01');
// const y = new EncryptInfo(1542143854262, 'London02');
// console.log('AT:  ', x.hash);
// console.log('AT:  ', y.hash);

// // mocking that its saved somewhere:
// const mockHash = "afd484a4fb8a44937cca02087d8c7aa3bce3162b2c58730206ec46de6bc51e0f";
// let enteredPassword = new EncryptInfo(1542143854262, 'London02');

// setTimeout(() => {

//     if (enteredPassword === mockHash) {
//         console.log('true');
//     }
//     console.log('typeof ', typeof x.hash);
// }, 500);