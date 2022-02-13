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

//function getUser(id) {
    //app.get(`api/user/${id}`, async (req, res) => {
    //     const {search} = req.query;
    //     console.log(search)
    //     const response = await axios.get() 
    //     res.send(response)
    //     return response
    // })
    //res.send('a single user')
//}

//getUser()

//app.get(`/api/user/${id}`, function (req, res) {
//    res.send('one user!')
//  })

//function getUsers() {
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