const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization// احصل على التوكن من رأس الطلب

    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret'); // استخدم نفس السر الذي استخدمته في تسجيل الدخول
        req.user = decoded; // تخزين معلومات المستخدم في الطلب
        next(); // تابع إلى المسار التالي
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;