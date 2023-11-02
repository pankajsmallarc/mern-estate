import UserObj from '../models/usermodel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new UserObj({ username, email, password: hashedPassword })
    try {
        const data = await newUser.save();
        return res.json({
            status: 201,
            message: "User created successfully",
            data
        })
    }
    catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await UserObj.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, 'Wrong credential!'));
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const {password:pass,...rest} = validUser._doc;
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error)
    }
}