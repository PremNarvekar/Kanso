import nanoid  from "nano-id"
import { cookieparser } from "../config/config.js"
import jsonwebtoken from "jsonwebtoken"



export const genrateNanoId = (length) =>{
    return nanoid(length)
}

export const signToken = ( payload)=>{
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})
}

export const verifyToken = (token)=>{

    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    console.log(decoded.id)
    return decoded.id
}

