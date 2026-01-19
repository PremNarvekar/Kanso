import bcrypt from "bcryptjs"
import { createUser, findUserByEmail, findUserById } from "../dao/user.dao.js"
import { ConflictError, UnauthorizedError } from "../utils/Error.handling.js"
import { signToken } from "../utils/helper.js"

// REGISTER
export const registerUser = async (name, email, password) => {
  const existingUser = await findUserByEmail(email)
  if (existingUser) {
    throw new ConflictError("User already exists")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await createUser(
    name,
    email,
    hashedPassword
  )

  const token = signToken({ id: newUser._id })
  return { token, user: newUser }
}

// LOGIN
export const login = async (email, password) => {
  const user = await findUserByEmail(email).select("+password")
  if (!user) {
    throw new UnauthorizedError("Invalid Email or Password")
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  )

  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid Email or Password")
  }

  const token = signToken({ id: user._id })
  user.password = undefined // never leak password

  return { token, user }
}

// UPDATE AVATAR
export const updateUserAvatar = async (userId, avatarUrl) => {
  const user = await findUserById(userId);
  if (!user) throw new UnauthorizedError("User not found");

  user.avatar = avatarUrl;
  await user.save();

  return user;
}
