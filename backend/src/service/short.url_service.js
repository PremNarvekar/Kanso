import {genrateNanoId} from "../utils/helper.js"
import urlSchema from "../model/shorturl.model.js"
import {saveShortUrl, getCustomShortUrl} from "../dao/short_url.js"


export const createShortUrlwithoutUser = async  (url)=>{
    const shortUrl =  genrateNanoId(7)
    if(!shortUrl) throw new Error("Short url not generated")
    await saveShortUrl(shortUrl,url)
    return shortUrl
}

export const createShortUrlwithUser = async  (url, userId, slug=null)=>{
    const shortUrl = slug ||  genrateNanoId(7)
    const exists = await getCustomShortUrl(slug)
    if(exists) throw new Error("This is custom url alredy exists")


    await saveShortUrl(shortUrl,url, userId)
    return shortUrl
}