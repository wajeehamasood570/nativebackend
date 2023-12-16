const { SendResponse } = require("../helpers/helpers");
const UserModel = require("../models/authmodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AuthController = {
  signUp: async (req, res) => {
    try {
      let { name, email, password, userType } = req.body;
      let obj = { name, email, password, userType };
      let errArr = [];

      if (!obj.name) {
        errArr.push("User Name is Required");
      }
      if (!obj.password) {
        errArr.push("Password is Required");
      }
      // if (!obj.userType) {
      //   errArr.push("User Type is Required");
      // }

      if (errArr.length > 0) {
        res.status(400).send(SendResponse(false, "Validation Error", errArr));
        return;
      }

      let userExist = await UserModel.findOne({ name: obj.name });

      if (userExist) {
        res
          .status(400)
          .send(SendResponse(false, "User Already Exist with this User Name"));
        return;
      }

      obj.password = await bcrypt.hash(obj.password, 10);

      let User = new UserModel(obj);
      let result = await User.save();

      if (result) {
        res
          .status(200)
          .send(SendResponse(true, "User Created Successfully", result));
      }
    } catch (error) {
      res.status(500).send(SendResponse(false, "Internal Server Error", error));
    }
  },
  login: async (req, res) => {
    try {
      let { name, password } = req.body;
      let obj = { name, password };
      let existingUser = await UserModel.findOne({ name: obj.name });

      if (existingUser) {
        let corerctPassword = await bcrypt.compare(
          obj.password,
          existingUser.password
        );

        // if (corerctPassword) {
        //   let token = jwt.sign({ ...existingUser }, process.env.SECRET_KEY);

          res.send(
            SendResponse(true, "Login Successfully", {
              // token: token,
              user: existingUser,
            })
          );
        // } else {
        //   res.send(SendResponse(false, "Password Not Match"));
        // }
      } else {
        res.send(SendResponse(false, "User Not Found with this User Name"));
      }
    } catch (error) { }
  },
  checkAuth: async (req, res, next) => {
   let token = req.headers.authorization?.split(" ")[1];
   res.send(token);
   jwt.verify(token, process.env.SECRET_KEY, (err, decode)=>{
    if(err){
      res.status(401).send(SendResponse(false, "Un Authorized"))
    }
    else{
      console.log(decode)
      res.status(200).send(SendResponse(true, "", decode._doc))
    }
   })

  },
  protected: async (req, res, next) => {
    try {
      // Get the token from the request headers
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        res.status(401).send(SendResponse(false, 'Unauthorized - Token missing'));
        return;
      }
      // Proceed to the next middleware or route handler
      else {
        next();
      }
    }
    catch (error) {
      res.status(500).send(SendResponse(false, 'Internal Server Error', error));
    }
  },
}


module.exports = AuthController;