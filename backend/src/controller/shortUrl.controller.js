import { createShortUrlwithoutUser, createShortUrlwithUser } from "../service/short.url_service.js"
import { getShortUrl } from "../dao/short_url.js"
import wrapAsync from "../utils/tryCatchWrapper.js"
import { getUrlsByUser } from "../dao/short_url.js"

export const createShortUrl = wrapAsync(async (req, res) => {
    const data = req.body
    let shortUrl 
    if(req.user){
       shortUrl = await createShortUrlwithUser(data.url,req.user._id,data.slug)
    }else{
       shortUrl = await createShortUrlwithoutUser(data.url)
    }
    res.status(200).json({shortUrl: process.env.APP_URL + shortUrl})
})

export const getUserHistory = wrapAsync(async (req, res) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
    const urls = await getUrlsByUser(req.user._id)
    res.status(200).json({ urls })
})


export const redirectFromShortUrl = wrapAsync(async (req, res) => {
    const { id } = req.params
    const url = await getShortUrl(id)
    if(!url) throw new Error("Short url not found")
    res.redirect(url.full_url)

})

export const createCustomShortUrl = wrapAsync(async (req, res) => {
    const { url, slug } = req.body
    const shortUrl = await createShortUrlWithoutUser(url, customUrl)
    res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl })

})

