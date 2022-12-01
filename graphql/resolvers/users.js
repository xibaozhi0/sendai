const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { ApolloError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const {
//   isAuthenticated,
//   registerValidation,
//   loginValidation,
// } = require("../../middleware/rules");
const User = require("../../models/User");

module.exports = {
  Mutation: {
    async registerUser(
      _,
      { registerInput: { username, email, password, phone, avatar } }
    ) {
   
      // see if an old user exist with email attempting to register
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        // throw error if that user exists
        throw new ApolloError("this user already exists", +email);
      }
      // if (validator.username.argument) {
      //   throw new ApolloError('Name should be between {ARGS[0]} and {ARGS[1]} characters')
      // }
      //encrypt password
      var encryptedPassword = await bcrypt.hash(password, 10);
      //build out mongoose model
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
        phone: phone,
        avatar: avatar,
        createdAt: new Date().toISOString(),
      });
      // create our JWT(attach to our user  model)
      const token = jwt.sign({ user_id: newUser._id, email }, "UNSAFE_STRING", {
        expiresIn: "1h",
      });
      newUser.token = token;
      // save user in mongodb
      const res = await newUser.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async loginUser(_, { loginInput: { username, email, password } }) {
      //see if a user exists with the email
      const user = await User.findOne({ email });
      // check if the entered password equals the encrypted
      if (user && (await bcrypt.compare(password, user.password))) {
        // create a new token
        const token = jwt.sign({ user_id: user._id, email }, "UNSAFE_STRING", {
          expiresIn: "1h",
        });
        // attatch toeken to uer model that we found above
        user.token = token;
        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        // if user does not exist, return error
        throw new ApolloError("incorrect password", "incorrect_password");
      }
    },
  },
  Query: {
    user: (_, { ID }) => User.findById(ID),
  },
};
