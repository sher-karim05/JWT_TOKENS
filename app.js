const express = require('express');
const jwt = require('jsonwebtoken');

const PORT = 5000;
const app = express();

app.get('/api/serve', (req, res) =>{
    res.json({
        message: 'Get request Successful!'
    })
})
app.post('/api/posts', verifyToken, (req, res)=> jwt.verify(req.token, 'secretkey', (err, authData)=>{
    if(err){
        res.sendStatus(403);
    }else{
        res.json({
            message: 'Post created...',
        authData
        })
    }
}), (req, res) =>{
    
    const user = {
        id: 1,
        username: 'karim',
        email: 'karimdeveloper12@gmail.com'
       }
    jwt.sign({user}, 'secretkey', {expireIn: '30s'}, (err, token)=>{
        res.json({
            token  
        })
    })
});
app.post('/api/login', (req, res) =>{
 //Mock user
})

//FORMAT OF TOKEN
//Authorization: Bearer <access_token>

//Verify Token
function verifyToken(req, res, next) {
    //Get auth header value

    const bearerHeader = req.headers['authorization'];
  //Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined'){
      //split at the space
      const bearer = bearerHeader.split(' ');
      //Get token array
      const bearerToken = bearer[1];
      //Set the token
      req.token = bearerToken;
      //Next middleware
      next()
  }else{
      //Forbidden
      res.sendStatus(403)
  }
}

app.listen(PORT, ()=> console.log('Server is listening at port: 5000'))



//{
//     "message": "Post created...",
//     "authData": {
//         "user": {
//             "id": 1,
//             "username": "karim",
//             "email": "karimdevloper12@gmail.com"
//         },
//        
//         "iat": 1630985841
//     }
// }

// iat=> (issued at) claim describes the time at which the JWT was issued.