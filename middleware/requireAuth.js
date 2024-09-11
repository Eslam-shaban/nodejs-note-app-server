import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;  // Corrected spelling

    if (!authorization) {
        return res.status(401).json({
            success: false,
            error: "Access denied. No token provided"
        });
    }

    const token = authorization.replace('Bearer ', '');  // Corrected spelling

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({
                success: false,
                error: "Invalid or expired token."
            });
        }

        const { id } = payload;
        console.log(payload)
        req.userId = id;
        next();
    });
};
