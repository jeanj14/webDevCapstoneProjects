import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'
import 'dotenv/config'


const app = express()
const port = '3000'
const API_KEY = process.env.NEWS_API_KEY
const API_URL = 'https://newsapi.org/v2/'
const config = {
    headers: {
        'X-API-KEY' : `${API_KEY}`
    }
}

app.use(express.static("public"))

// Create an AXIOS GET response to the NewsAPI in order to get the top headlines

app.get("/", async (req, res) => {
    // Send out 3 different API requests to fetch 3 different types of data
    // each request is for a category of news articles : business, technology and sports
    // they will be rendered into the EJS template and displayed as articles
    try {
        const business_response = await axios.get(`${API_URL}top-headlines?category=business`, config)
        const technology_response = await axios.get(`${API_URL}top-headlines?category=technology`, config)
        const sports_response = await axios.get(`${API_URL}top-headlines?category=sports`, config)
        // console.log(business_response.data[0])
        res.render("index.ejs", {
            business : business_response.data ,
            technology : technology_response.data,
            sports : sports_response.data
        })

    } catch (error) {
        console.error(error);
        // res.render(JSON.stringify(error))
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})