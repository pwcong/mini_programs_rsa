//index.js
//获取应用实例
import * as rsa from '../../utils/rsa/rsa'
import Base64 from '../../utils/base64'

const PRIVATE_KEY = `
-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAKudV53Xa0KozELnDfIpYBjsxl1gO+c0pbpdL62b6g2J1O6K83RW
HvhfseYpeoQ9QAyxMVRYsZgekwf564pQLIsCAwEAAQJAVvVLSDe3qfdOSTg64NIG
V5riiL4SnH0Y3O4LErVGS8UO3U00ZFt5Cm20ZqqK+ZbZ8yXubaA5mPo3uAa1Mj1C
gQIhAN1KBDIE/vX0B+SsBB2gS87qVWHWU1jtyxGuAoev22YZAiEAxoiejEL/2lb+
M5Ga1cwP4WxdpgV2dWUpn+xjNsOOlEMCIEZZuJm6UuAYc8X0Fd7hThh7ESfofljg
SFXXj0BZ3RNJAiAm3QWUVWU6O39FXwJdSbXuHcVzQ2x97JCqYp7FUKCvewIhALvI
a8T1cI3QrV4btu8A5QZckM335yY89GVDh1ujD00A
-----END RSA PRIVATE KEY-----
`

const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKudV53Xa0KozELnDfIpYBjsxl1gO+c0
pbpdL62b6g2J1O6K83RWHvhfseYpeoQ9QAyxMVRYsZgekwf564pQLIsCAwEAAQ==
-----END PUBLIC KEY-----
`

var app = getApp()

Page({
  data: {
    privateKey: PRIVATE_KEY,
    publicKey: PUBLIC_KEY,
    plainText: null,
    cipherText: null
  },
  onLoad: function () {

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

    var cipherText = rsa.encryptedString(key, plainText,
      rsa.RSAAPP.PKCS1Padding, rsa.RSAAPP.RawEncoding)

    this.setData({
      plainText: plainText,
      cipherText: Base64.btoa(cipherText)
    })

  }
})
