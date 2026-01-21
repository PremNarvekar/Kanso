import { genrateNanoId } from "../utils/helper.js"
import urlSchema from "../model/shorturl.model.js"
import { saveShortUrl, getCustomShortUrl, findUrlByFullUrl } from "../dao/short_url.js"


export const createShortUrlwithoutUser = async (url) => {
    // Check if URL already exists
    const existing = await findUrlByFullUrl(url)
    if (existing) return existing.short_url

    const shortUrl = genrateNanoId(7)
    if (!shortUrl) throw new Error("Short url not generated")
    await saveShortUrl(shortUrl, url)
    return shortUrl
}

export const createShortUrlwithUser = async (url, userId, slug = null) => {
    // If user requests a custom slug, try to use it (don't deduplicate against existing random ones)
    if (slug) {
        const exists = await getCustomShortUrl(slug)
        if (exists) throw new Error("This is custom url alredy exists")

        await saveShortUrl(slug, url, userId)
        return slug
    }

    // If no custom slug, check for existing URL
    const existing = await findUrlByFullUrl(url)
    if (existing) return existing.short_url

    const shortUrl = genrateNanoId(5)
    await saveShortUrl(shortUrl, url, userId)
    return shortUrl
}