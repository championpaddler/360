const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {
    res.removeHeader("Server");
    res.removeHeader("X-Powered-By");
    next();
});


app.use(bodyParser.json())

app.get("/search", async (req, res) => {


    let data = JSON.stringify({
        "messages": [
            {
                "role": "system",
                "content": "Give me list (MAX 5) of hotels in "+ req.query.location +" only with the name"
            }
        ]
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://openai-hackathon-westeurope-04.openai.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2023-03-15-preview',
        headers: {
            'api-key': '9406eb7044954dd5a18f3600eee1c0c8',
            'Content-Type': 'application/json'
        },
        data: data
    };

    let result = await axios.request(config);
    res.send(result.data.choices[0].message.content)
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000");
});