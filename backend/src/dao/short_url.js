import urlSchema from "../model/shorturl.model.js"
import { ConflictError } from "../utils/Error.handling.js"


export const saveShortUrl = async (shortUrl, longurl, userId) => {

    try {
        const newUrl = new urlSchema({
            full_url: longurl,
            short_url: shortUrl

        })

        if (userId) {
            newUrl.user = userId
        }
        await newUrl.save()

    } catch (err) {
        if(err.code == 11000){
            throw new ConflictError("Short Url alredy exists ")
        }
       
        throw new Error(err)

    }
}


export const getShortUrl = async (shortUrl) => {
    return await urlSchema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}});
}

export const getCustomShortUrl = async (slug) =>{
    return await urlSchema.findOne({short_url:slug})
    
}

export const getUrlsByUser = async (userId) => {
    return await urlSchema.find({ user: userId }).sort({ createdAt: -1 })
}
