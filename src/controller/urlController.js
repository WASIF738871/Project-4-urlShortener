const urlId = require('short-id')
// const validUrl = require('valid-url')      //doubt double validation
const urlModel = require('../model/urlModel')


const urlShorter = async function (req, res) {
    try {
        let origUrl = req.body.longUrl;
        if (!origUrl) {
            return res.status(400).send({ status: false, message: "please Enter original URL in body" })
        }

        // let validatedUrl = validUrl.isUri(origUrl)
        if (!/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/.test(origUrl)) {
            return res.status(400).send({ status: false, message: "please Enter valid URL in body" })
        }

        let isPresent = await urlModel.findOne({ longUrl: origUrl }).select({ _id: 0, longUrl: 1, shortUrl: 1, urlCode: 1 })
        if (isPresent) {
            return res.status(200).send({ status: true, message: "short URL is already generated with requested URL", data: isPresent }) // doubt with status code and status 400/200  and msg as well
        }

        let baseUrl = "http://localhost:3000/"
        let urlCode = urlId.generate(origUrl)
        let reqUrl = baseUrl + urlCode

        obj = {
            longUrl: origUrl,
            shortUrl: reqUrl,
            urlCode: urlCode
        }

        let urlDetails = await urlModel.create(obj)
        return res.status(201).send({ status: true, data: obj })
    } catch (err) {
        return res.status(500).send({ satus: false, messege: err.message })
    }
}


let redirectUrl = async function (req, res) {
    try {
        let urlCode = req.params.urlCode
        console.log(urlCode)
        // if (!urlCode){
        //     return res.status(400).send({ status: false, message: "please Enter urlCode in body" })
        // }
        let urlExists = await urlModel.findOne({urlCode:urlCode})
        if (!urlExists){
            return res.status(404).send({ status: false, message: "urlCode not found" })
        }
        
        let origUrl = await urlModel.findOne({ urlCode })
        return res.status(302).send(`Redirecting to ${origUrl.longUrl}`)
        // return res.status(302).redirect(origUrl.longUrl)
    } catch (err) {
        return res.status(500).send({ satus: false, messege: err.message })
    }

}





module.exports = {
    urlShorter,
    redirectUrl
}