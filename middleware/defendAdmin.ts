import jwt from 'jsonwebtoken';

export const protectAdmin = (req, res, next) => {
    console.log("ProtectAdmin middleware called");
    const bearer = req.headers.authorization;
    let token;
    
    console.log("Authorization header:", bearer);
    if (!bearer) {
        res.status(401);
        res.send("No authorization header");
        return;
    }
    
    const [, extractedToken] = bearer.split(" ");
    token = extractedToken;
    console.log("Extracted token:", token);
    if (!token) {
        console.log("No token found");
        res.status(401);
        res.send("No token");
        return;
    }
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        console.log("Token payload:", payload);
    
        // Check if the user is an admin
        if (req.user.role !== 'ADMIN') {
        res.status(403).send('Forbidden: Admins only');
        return;
        }
    
        next();
        return;
    } catch (e) {
        console.error("JWT verification error:", e);
        res.status(401);
        res.send("Not authorized because of token");
        return;
    }
    }