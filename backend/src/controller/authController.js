import { registerUser, login } from "../service/auth.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js"
import { cookieparser } from '../config/config.js'

export const register = wrapAsync(async (req, res) => {
    const { name, email, password } = req.body
    const { token, user } = await registerUser(name, email, password)
    req.user = user
    res.cookie("accessToken", token, cookieparser)
    res.status(200).json({ user: user, message: "register success" })
})

export const loginUser = wrapAsync(async (req, res) => {
    const { email, password } = req.body
    const { token, user } = await login(email, password)
    req.user = user
    res.cookie("accessToken", token, cookieparser)
    res.status(200).json({ user: user, message: "Login Success" })
})

export const logout = wrapAsync(async (req, res) => {
    res.clearCookie('accessToken', cookieparser)
    res.status(200).json({ message: 'Logout success' })
})

export const me = wrapAsync(async (req, res) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
    // ensure password is not sent
    const user = { ...req.user._doc }
    if (user.password) delete user.password
    res.status(200).json({ user })
})

export const updateAvatar = wrapAsync(async (req, res) => {
    const { avatar } = req.body;
    const userId = req.user._id;

    // Validate
    if (!avatar) {
        return res.status(400).json({ message: 'Avatar URL is required' });
    }

    const { updateUserAvatar } = await import("../service/auth.service.js"); // Dynamic import to avoid circular dep if any, or just standard import above if clean
    const updatedUser = await updateUserAvatar(userId, avatar);

    res.status(200).json({ user: updatedUser, message: "Avatar updated" });
})