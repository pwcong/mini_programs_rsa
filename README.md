# Mini Programs RSA
RSA library for Wechat Mini Programs.

## Usage
```javascript
import * as rsa from '../../utils/rsa/rsa'
import Base64 from '../../utils/base64'

...

var key = new rsa.RSAKeyPair(
    // Public exponent extracted from private_key.pem using
    // openssl rsa -inform PEM -text -noout < private_key.pem
    // Or extracted from public key PEM file using
    // openssl rsa -pubin -inform PEM -text -noout < public_key.pem
    "10001",

    // Dummy decryption exponent -- actual value only kept on server.
    "10001",

    // Modulus extracted from private key PEM file using
    // openssl rsa -inform PEM -modulus -noout < private_key.pem
    // Or extracted from public key PEM file using
    // openssl rsa -pubin -inform PEM -modulus -noout < public_key.pem
    "AB9D579DD76B42A8CC42E70DF2296018ECC65D603BE734A5BA5D2FAD9BEA0D89D4EE8AF374561EF85FB1E6297A843D400CB1315458B1981E9307F9EB8A502C8B",

    // Key size in bits.
    512
)

var plainText = 'Hello World!'

// Encrypt data. Return the cyphertext block.
var cipherText = rsa.encryptedString(key, plainText,
    rsa.RSAAPP.PKCS1Padding, rsa.RSAAPP.RawEncoding)

console.log(Base64.btoa(cipherText))


```