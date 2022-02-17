const express = require('express')
const axios = require('axios')
const app = express()
const path = require('path')
const port = 3000;

app.use('/', express.static(path.join(__dirname, "client", "build")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 8000;
// }
app.listen(port);

//data arrays/objects goes here
//when moving the objects over here, ...the client needs to request the deata from an endpoint on server where data lives
//

app.get(`/api/users`, function (req, res) {
    res.send(
                [
                    {
                        "id": 1,
                        "username": "green123",
                        "password": "hatsoff"
                    },
                    {
                        "id": 2,
                        "username": "SammieGurl",
                        "password": "hacktheplanet24" 
                    },
                    {
                        "id": 3,
                        "username": "TacoTownLover",
                        "password": "tacos_forever"    
                    }
                ]
            )
})


app.get(`/api/messages`, function(req, res) {
    const {text} = req.query;
    console.log(text)
    res.send(
                [
                    [
                       {
                            chat_id: 4,
                            user_id: 3,
                            text: "hey, what's upall.",
                            lang: 'EN'
                        },
                        {
                            chat_id: 5,
                            user_id: 3,
                            text: "I want tacos!",
                            lang: 'EN'
                        },
                        {
                            chat_id: 6,
                            user_id: 2,
                            text: "??",
                            lang: 'EN'
                        }
                
                    ],
                    [
                        {
                            chat_id: 10,
                            user_id: 3,
                            text: "¿Cómo te llamas?",
                            lang: 'SP'
                        },
                        {
                            chat_id: 11,
                            user_id: 1,
                            text: "Me llamo Kermit.",
                            lang: 'SP'
                        },
                        {
                            chat_id: 12,
                            user_id: 2,
                            text: "¿Me puede pasar la sal/la pimienta?",
                            lang: 'SP'
                        } 
                    ],

                    [
                        {
                            chat_id: 7,
                            user_id: 3,
                            text: "你好",
                            lang: 'CH'
                        },
                        {
                            chat_id: 8,
                            user_id: 3,
                            text: "你从哪里来？",
                            lang: 'CH'
                        },
                        {
                            chat_id: 9,
                            user_id: 2,
                            text: "我从 中国 来。",
                            lang: 'CH'
                        },
                        {
                            message: `${text}`
                        }
                    ]

                ]
    )
})

