const Users = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { use } = require('bcrypt/promises');

const secretKey = process.env.SECRET_KEY || 'fo9ma'; // Use environment variable for secret key

function generateToken(userId) {
    return jwt.sign({ id: userId }, secretKey, { expiresIn: '10h' });
}

module.exports.createUser = async (req, res) => {
    try {
        const { name, phone, pw, email, adresse, companyname } = req.body;

        if (!name || !phone || !pw || !adresse || !companyname) {
            return res.status(400).json({ error: "full name, Phone, and Password are required" });
        }

        const hashedPassword = await bcrypt.hash(pw, 10);

        const newUser = await Users.create({ name, phone, pw: hashedPassword, email, adresse, companyname });
        const token = generateToken(newUser._id);

        res.status(200).json({ user: newUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const { email, pw } = req.body;

        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const result = await bcrypt.compare(pw, user.pw);
        console.log("Password :", pw, "Hased PW :", user.pw);
        console.log("Result : ", result);
        if (!result) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '10h' });
        // req.session.userId = user._id;
        console.log('Token : ', token);
        res.status(200).cookie('token', token).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.getAll = (req, res) => {
    const token = req.headers.authorization;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json(err);
        }

        const userId = decoded.userId;

        if (req.session.userId !== userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        Users.findById({ _id: userId })
            .then(user => {
                console.log("the user has logged in", user);
                res.status(200).json(user);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            });
    });
};

module.exports.findOneByToken = async (req, res) => {
    console.log("Received request at findOneByToken");
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], 'fo9ma');
        console.log(decoded);
        if (!decoded.id) {
            console.log("ther is no decoded userId");
            return res.status(401).json({ error: 'User ID not found in token' });
        }
        console.log("Decoded:", decoded);
        const user = await Users.findOne({ _id: decoded.id });
        console.log(user);
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ error: 'User not found' });
        }
        if (user) {
            console.log(user);
            return res.status(200).json(user);
        } else {
            console.log("error");
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};



module.exports.findOne = async (req, res) => {
    const { token } = req.cookies
    console.log(req.cookies);
    if (!token) {
        return res.status(401).json({ error: 'Please try to login.' });
    }
    try {
        const jwtReturn = await jwt.verify(token, secretKey);
        console.log("JWT Return :", jwtReturn);
        const user = await Users.findById(jwtReturn.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
