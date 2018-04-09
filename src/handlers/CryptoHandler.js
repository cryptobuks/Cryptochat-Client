import openpgp from 'openpgp';

/**
 * Handles cryptography using openpgp.js
 */
export class CryptoHandler {
    constructor() {
        //openpgp.config.aead_protect = true;

        // Check for existing keys
        if(window.sessionStorage.getItem("ownkeys") !== null) {
            // Parse and fill into window
            window.ownKeys = JSON.parse(window.sessionStorage.getItem("ownkeys"));
        } else {
            // No session keys yes, generate them
            this.generateKeyPair();
        }

        // Load the private key object for en/decrypting data
        window.privateKeyObject = openpgp.key.readArmored(window.private).keys[0];
        await window.privateKeyObject;
    }

    /**
     * Encrypts a message for a specific recipient (and signs it)
     * @param {string} publicKey The public key (armored) of the recipient
     * @param {string} message The message to encrypt
     * @param {function} onComplete The function that is called upon encrypting
     */
    encrypt(publicKey, message, onComplete) {
        let options = {
            data: message,
            publicKeys: openpgp.key.readArmored(publicKey).keys,
            privateKeys: [window.privateKeyObject]
        };
        openpgp.encrypt(options).then(ciphertext => {
            onComplete(ciphertext);
            console.log(ciphertext);
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
}