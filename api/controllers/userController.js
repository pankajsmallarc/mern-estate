import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import UserObj from '../models/usermodel.js';

export const test = (req, res) => {
    res.json({ message: "Controller is working" })
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You van update only your account'));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const inputJson = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar
        }
        const updatedUser = await UserObj.findByIdAndUpdate(req.params.id, { $set: inputJson }, { new: true });
        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest)

    } catch (error) {
        next(error)
    }
}