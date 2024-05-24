const { GraphQLError } = require("graphql");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resolvers = {
    Query: {
        findAllUser: async () => {
            const users = await User.findAllUser();
            return users;
        },
        findUserByUsername: async (_, args) => {
            const findUser = await User.findByUsername(args.username);
            return findUser;
        },
        findUserById: async (_, args) => {
            const { _id } = args;
            const user = await User.findUserById(_id);
            return user;
        },

        findLoginUserCurrent: async (_, __, contextValue) => {
            const decodedToken = await contextValue.authentication();
            const _id = decodedToken._id;
            const user = await User.getUserProfile(_id);
            return user;
        }


    },
    Mutation: {
        register: async (_, args) => {
            const userNew = args.userNew;
            const result = await User.createUser(userNew);
            console.log(result);
            return result;
        },

        login: async (_, args) => {
            const { email, password } = args;
            const userLogin = await User.findUserByEmail(email);
            if (!userLogin) {
                throw new GraphQLError("Invalid email/password", {
                    extensions: {
                        code: "Unauthorized",
                    },
                });
            }
            const isPasswordValid = bcryptjs.compareSync(password, userLogin.password);
            if (!isPasswordValid) {
                throw new GraphQLError("Invalid email/password", {
                    extensions: {
                        code: "Unauthorized",
                    },
                });
            }
            const access_token = jwt.sign({
                _id: userLogin._id,
                email: userLogin.email,
                username: userLogin.username,
            },
                process.env.JWT_SECRET
            );
            return {
                access_token,
                email,
            };
        },
    },
};

module.exports = resolvers;