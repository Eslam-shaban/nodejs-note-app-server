import User from '../models/User.model.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
}

export const register = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, error: 'Invalid email format.' });
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ success: false, error: 'Please provide a strong password' });
    }

    try {
        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({ success: false, error: 'User already exists with this email.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ email, password: hashedPassword });
        const savedUser = await newUser.save();
        const token = generateToken(savedUser._id);

        res.status(201).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Define login function here
export const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, error: 'Invalid email format.' });
    }
    try {
        const existUser = await User.findOne({ email });

        if (!existUser) {
            return res.status(401).json({ success: false, error: 'Invalid credentials. Please check your email and password.' });
        }

        const match = await bcrypt.compare(password, existUser.password);
        if (!match) {
            return res.status(401).json({ success: false, error: 'Invalid credentials. Please check your email and password.' });
        }
        const token = generateToken(existUser._id)
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }

};
