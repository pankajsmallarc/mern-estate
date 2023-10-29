import UserObj from '../models/usermodel.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
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
        return res.json({
            status:500,
            message:error.message
        })
    }
}