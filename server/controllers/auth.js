const users = []
const bcrypt = require ('bcrypt')
module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body;
      const userFound = users.find(user => user.username ===username);
      if(userFound) {
        bcrypt.compare(password, userFound.password, function(err, result) {
          if (result) {
            delete userFound.password;
            res.status(200).send(userFound)

            console.log("It matches!")
            return;
          }
          else {
            console.log("Invalid password!");
          }
        });
      } else {
        res.status(400).send("User not found.")
      }
      // for (let i = 0; i < users.length; i++) {
      //   if (users[i].username === username) {
      //     console.log(username)
      //     bcrypt.compare(password, users[i].password, function(err, result) {
      //       if (result) {
      //         // const user = {...users[i]};
      //         // console.log(user)
      //         res.status(200).send(users[i])

      //         console.log("It matches!")
      //         return
      //       }
      //       else {
      //         console.log("Invalid password!");
      //       }
      //     });
      //   }
      // }
      console.log('here')
      
    },
    register: (req, res) => {
        console.log('Registering User')
        const saltRounds = 10;
        const password = req.body.password;
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash) {
          // returns hash

          req.body.password = hash;
          users.push(req.body)

          });
        });
        
        res.status(200).send(req.body)
    }
}