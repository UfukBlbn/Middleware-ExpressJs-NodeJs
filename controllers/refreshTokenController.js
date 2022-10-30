const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

 
const handleRefreshToken = (req,res) => {

    const cookies = req.cookies;

    if(!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
 
    const foundUser = usersDB.users.find(person=>person.refreshToken === refreshToken);

    if(!foundUser)return res.status(403);
   
    //evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded) => {
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken  = jwt.sign(
                {
                    "UserInfo": 
                        {   "username":foundUser.username, 
                            "roles":roles
                        }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'30s'}
                );
                res.json({accessToken})
        }   
    );
};

module.exports = {handleRefreshToken}