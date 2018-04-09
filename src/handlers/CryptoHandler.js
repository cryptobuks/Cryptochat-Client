var openpgp = require('openpgp');

/**
 * Handles cryptography using openpgp.js
 */
export class CryptoHandler {
    constructor() {
        // Check for existing keys
        if(window.sessionStorage.getItem("ownkeys") !== null) {
            // Parse and fill into window
            window.ownKeys = JSON.parse(window.sessionStorage.getItem("ownkeys"));
        } else {
            // No session keys yes, generate them
            this.generateKeyPair();
        }
        // Load the private key object for en/decrypting data
        window.privateKeyObject = openpgp.key.readArmored(window.ownKeys.private).keys[0];
        // Decrypt the key
        window.privateKeyObject.decrypt(window.ownKeys.passphrase);
    }

    /**
     * Encrypts a message for a specific recipient (and signs it)
     * @param {string} publicKey The public key (armored) of the recipient
     * @param {string} plaintext The message to encrypt
     * @param {function} onComplete The function that is called upon encrypting
     */
    encrypt(publicKey, plaintext, onComplete = ()=>{}) {
        let options = {
            data: plaintext,
            publicKeys: openpgp.key.readArmored(publicKey).keys, // For encrypting
            privateKeys: [window.privateKeyObject] // For signing
        };
        openpgp.encrypt(options).then(ciphertext => {
            onComplete(ciphertext);
            console.log(ciphertext, "encrypted");
        });
    }

    /**
     * Decrypts a ciphetext using the private keys and verifies the signature
     * with a given public key
     * @param {String} publicKey The public key (armored) of the sender to verify
     * @param {String} ciphertext The ciphertext to decrypt
     * @param {function} onComplete The function that is called upon decrypting
     */
    decrypt(publicKey, ciphertext, onComplete = () => {}) {
        let options = {
            message: openpgp.message.readArmored(ciphertext),
            publicKeys: openpgp.key.readArmored(publicKey).keys,
            privateKeys: [window.privateKeyObject]
        };

        openpgp.decrypt(options).then(plaintext => {
            onComplete(plaintext);
            console.log(plaintext,"decrypted");
        });
    }

    /**
     * Generates a new PGP key pair
     */
    generateKeyPair() {
        let pass = "%cryptopass" + performance.now() + Date.now() + "€!";
        let options = {
            userIds: [{ name: '', email: 'none@example.com'}],
            numBits: window.config.KEY_SIZE,
            passphrase: pass
        };

        openpgp.generateKey(options).then(function(key) {
            console.warn(key.publicKeyArmored);
            console.warn(key.privateKeyArmored);
            window.ownKeys = {
                public: key.publicKeyArmored,
                private: key.privateKeyArmored,
                passphrase: pass
            };
            window.sessionStorage.setItem('ownkeys', JSON.stringify(window.ownKeys));
        });
    }

    /**
     * Returns own public key
     */
    getOwnPublicKey() {
        return window.ownKeys.public;
    }

    storePublicKey(conversation, key) {
        let oldKeys = [];
        if(window.sessionStorage.getItem("public_keys") !== null) {
            oldKeys = JSON.parse(window.sessionStorage.getItem("public_keys"));
        }
        oldKeys.push({
            conversation, key
        });
        window.sessionStorage.setItem("public_keys", JSON.stringify(oldKeys));
    }

}
