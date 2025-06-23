# JSON Web Token (JWT)

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.

### Key Features
- **Compact**: JWTs are small in size, making them easy to transmit in URLs, HTTP headers, or within the body of a request.
- **Self-contained**: JWTs contain all the necessary information about the user, reducing the need for multiple database lookups.
- **Secure**: JWTs can be signed using a secret (with HMAC algorithm) or a public/private key pair using RSA or ECDSA, ensuring the integrity and authenticity of the token.
- **Interoperable**: JWTs can be used across different programming languages and platforms, making them a versatile choice for authentication and information exchange.
- **Claims**: JWTs consist of three parts: header, payload, and signature. The header typically consists of the type of token (JWT) and the signing algorithm used. The payload contains the claims, which are statements about an entity (typically, the user) and additional data. The signature is used to verify that the sender of the JWT is who it claims to be and to ensure that the message wasn't changed along the way.
- **Expiration**: JWTs can include an expiration time (exp claim), allowing them to be valid only for a specific period, enhancing security by limiting the window of opportunity for misuse.
- **Stateless**: JWTs are stateless, meaning that the server does not need to store session information. All the necessary information is contained within the token itself, allowing for scalable and efficient authentication.
- **Use Cases**: JWTs are commonly used for authentication and authorization in web applications, APIs, and microservices architectures. They can also be used for information exchange between parties.
- **Standardized**: JWTs follow a standardized format, making them easy to implement and integrate with various systems and libraries.
- **OpenID Connect**: JWTs are often used in OpenID Connect (OIDC) as ID tokens, which provide information about the authenticated user and can be used to establish a session.
- **OAuth 2.0**: JWTs can be used as access tokens in OAuth 2.0, allowing clients to access protected resources on behalf of the user.
- **Security Considerations**: While JWTs provide a secure way to transmit information, it is essential to implement proper security measures, such as using HTTPS, validating tokens, and managing token expiration and revocation.
- **Libraries and Tools**: There are numerous libraries available for creating, signing, and verifying JWTs in various programming languages, making it easy to integrate JWTs into applications.
- **Revocation**: Since JWTs are stateless, revoking a token typically requires implementing additional mechanisms, such as maintaining a blacklist of revoked tokens or using short-lived tokens with refresh tokens for session management.

### Key Concepts
- **Header**: Contains metadata about the token, including the type of token and the signing algorithm used.
- **Payload**: Contains the claims, which are statements about the user and additional data. Common claims include `sub` (subject), `iat` (issued at), `exp` (expiration), and custom claims.
- **Signature**: Used to verify the integrity of the token and ensure that it has not been tampered with. The signature is created by combining the encoded header, encoded payload, and a secret or private key.
- **Claims**: Claims are key-value pairs that provide information about the user or the token itself. They can be standard claims (like `iss`, `sub`, `aud`, `exp`) or custom claims defined by the application.
- **Expiration**: JWTs can include an expiration time (`exp` claim) to limit their validity period, enhancing security by reducing the risk of token misuse.
- **Refresh Tokens**: In scenarios where long-lived sessions are required, refresh tokens can be used to obtain new access tokens without requiring the user to log in again.

### Examples 
```js
// signing a JWT
const jwt = require("jsonwebtoken");
const signJwt = async (data) => {
    return jwt.sign(data, secret, {algorithm: 'HS512', expiresIn: '1h'})
}
```

```js
// validate a jwt
const jwt = require("jsonwebtoken");
const validateJwt = async (token) => {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded; // returns the payload if valid
    } catch (err) {
        throw new Error("Invalid token");
    }
}
```

```js
// example integration with Express.js
require('dotenv').config();
const express = require("express");
const jwt = require("jsonwebtoken");

const secret = 'JWT_SECRET_KEY';

const verifyJwtMiddleware = async (req, res, next) => {
    if (req.path === "/login") {
        return next();
    }
    const token = req.headers.authorization?.replace(/^Bearer\s+/, '');
    if (!token) {
        throw new Error("unauthorized");
    }
    res.user = jwt.verify(token, secret);
    await next();
}


const app = express();
app.use(express.json());
app.use(verifyJwtMiddleware);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the API",
        status: "success"
    })
})

app.post("/login", async (req, res) => {
    const {username, password} = req.body
    if (username !== "admin" || password !== "password") {
        return res.json({
            message: "Invalid username or password",
            status: "error"
        })
    }
    const token = await jwt.sign(data, secret, {algorithm: 'HS512', expiresIn: '1h'});
    res.json({message: "Login successful", status: "success", token});
});

app.get('/me', (req, res) => {
    res.json(res.user);
});

app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        status: "error"
    });
});
app.listen(3001);
```

### Refs
- [OpenID](OPENID.md)
- [JWT](https://jwt.io/)
