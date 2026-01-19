import User from "../model/userModel.js"

export const findUserByEmail = (email) => {
  return User.findOne({ email })
}

export const findUserById = (id) => {
  return User.findById(id)
}

export const createUser = (name, email, password) => {
  return User.create({ name, email, password })
}

