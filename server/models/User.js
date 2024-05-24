const { database } = require("../config/mongodb");
const { ObjectId } = require("mongodb");
const bcryptjs = require("bcryptjs");
const validator = require("validator");
const { GraphQLError } = require("graphql");

module.exports = class User {
    static collection() {
        return database.collection("users");
    }
    static async getUserProfile(_id) {
        const userCollection = this.collection();
        const dataUser = await userCollection.aggregate([
            {
                $match: {
                    _id: new ObjectId(_id),
                },
            },
            {
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "followingId",
                    as: "followers",
                },
            },
            {
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "followerId",
                    as: "Following",
                },
            },
            {
                $project: {
                    password: 0,
                },
            },
        ]).toArray();
        return dataUser[0];
    }
    static async findUserById(_id) {
        const userCollection = this.collection();
        const dataUser = await userCollection.findOne({ _id: new ObjectId(_id) });
        return dataUser;
    }

    static async findAllUser() {
        const userCollection = this.collection();
        const dataUser = await userCollection.find({}).toArray();
        return dataUser;
    }
    static async findByUsername(username) {
        const userCollection = this.collection();
        const dataUser = await userCollection.find({
            username: { $regex: new RegExp(username, "i") }
        }).toArray();
        console.log(dataUser);
        return dataUser;
    }
    static async findUserByEmail(userNew) {
        const userCollection = this.collection();
        const dataUser = await userCollection.findOne({ email: userNew.email });
        return dataUser;
    }

    static async createUser(userNew) {
        const userCollection = this.collection();
        const isEmailValid = validator.isEmail(userNew.email);
        const isPasswordLengthValid = validator.isLength(userNew.password, { min: 5 });
        const isEmailUniqueValid = await userCollection.findOne({
            email: userNew.email,

        });
        const isUsernameUniqueValid = await userCollection.findOne({ username: userNew.username })

        if (validator.isEmpty(userNew.name)) {
            throw new GraphQLError("name is required", {
                extensions: {
                    code: "BAD_USER_INPUT",
                },
            });
        }

        if (validator.isEmpty(userNew.username)) {
            throw new GraphQLError("username is required", {
                extensions: {
                    code: "BAD_USER_INPUT",
                },
            });
        }

        if (validator.isEmpty(userNew.email)) {
            throw new GraphQLError("email is required", {
                extensions: {
                    code: "BAD_USER_INPUT",
                },
            });
        }

        if (validator.isEmpty(userNew.password)) {
            throw new GraphQLError("password is required", {
                extensions: {
                    code: "BAD_USER_INPUT",
                },
            });
        }

        if (!isEmailValid) {
            throw new GraphQLError("invalid email format", {
                extensions: {
                    code: "BAD_USER_INPUT",
                },
            });
        }
        if (!isPasswordLengthValid) {
            throw new GraphQLError("password must be at least 5 character or more", {
                extensions: {
                    code: "BAD_USER_INPUT",
                },
            });
        }
        if (isEmailUniqueValid) {
            throw new GraphQLError("email must be unique", {
                extensions: {
                    code: "BAD_USER_INPUT",
                },
            });
        }
        if (isUsernameUniqueValid) {
            throw new GraphQLError("username must be unique", {
                extensions: {
                    code: "BAD_USER_INPUT",
                },
            });
        }

        const dataUser = await userCollection.insertOne({
            ...userNew,
            password: bcryptjs.hashSync(userNew.password),
        });
        console.log(dataUser);
        const createUser = this.findUserById(dataUser.insertedId);

        return createUser;
    }
    static async findUserByEmail(email) {
        const userCollection = this.collection();
        const dataUser = await userCollection.findOne({ email: email });
        return dataUser;
    }
}

