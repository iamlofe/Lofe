bcrypt-nodejs-as-promised
==================
This is a modified version of the original bcrypt-as-promised as I was having issues using bcrypt.

Original can be found here [bcrypt-as-promised](https://github.com/iceddev/bcrypt-as-promised)

A promisified version of [bcrypt](https://github.com/ncb000gt/node.bcrypt.js)

## Install via NPM
```
npm install bcrypt-nodejs-as-promised
```

## Basic Usage

hashing:
```javascript
    bcyrpt.hash('my password', 10)
      .then(console.log, console.error)
```

comparing:
(note that an invalid password/hash combo errors as a rejected promise)
```javascript
    bcyrpt.compare('my password', someHash)
      .then(console.log, console.error)
```

__Note: an invalid password/hash combo errors as a rejected promise__

The rejection can be checked against `instanceof bcrypt.MISMATCH_ERROR`

```js
bcrypt.compare('invalid password', someHash)
  .then(handleValidPassword)
  .catch(bcrypt.MISMATCH_ERROR, handleInvalidPassword)
  .catch(handleOtherErrors);
```

generating a salt:
```javascript
    bcyrpt.genSalt(10)
      .then(console.log, console.error)
```

calculating the rounds used in a salt:
```javascript
    bcyrpt.getRounds(someHash)
      .then(console.log, console.error)
```
