const { ObjectId } = require("mongodb");
const { database }  = require("../config/mongodb");
const { GraphQLError } = require("graphql");
const validator = require("validator");

module.exports = class Post{
    static collection() {
        return database.collection("posts");
    }

    static async findAllPost() {
        const postCollection = this.collection();
        const data = await postCollection.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author"
                },
            },
            {
                $unwind: {
                    path: "$author",
                },
            },
            {
                $project: {
                    "author.password": 0,
                },
            },
        ]).toArray();
        return data;
    }

    static async findPostById(_id) {
        const postCollection = this.collection();
        const data = await postCollection.aggregate([
            {
                $match: {
                    _id: new ObjectId(String(_id))
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author",
                },
            },
            {
                $unwind: {
                    path: "$author",
                },
            },
            {
                $project: {
                    "author.password": 0,
                },
            },
        ]).toArray();
        return data[0];
    }

    static async insertPost(data) {
        const postCollection = this.collection();
        if (validator.isEmpty(data.content)) {
            throw new GraphQLError("content is required", {
                extensions: {
                    code: "USER_BAD_INPUT"
                },
            });
        }
        const result = await postCollection.insertOne({
            ...data,
            authorId: new ObjectId(String(data.authorId)),
            likes: [],
            comments: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const createPost = await this.findPostById(result.insertedId);
        return createPost;
    }

    static async insertComment(data) {
        const postCollection = this.collection();
        if (validator.isEmpty(data.content)) {
            throw new GraphQLError("content is required", {
                extensions: {
                    code: "USER_BAD_INPUT",
                },
            });
        }

        if (validator.isEmpty(data.username)) {
            throw new GraphQLError("username is required", {
                extensions: {
                    code: "USER_BAD_INPUT",
                },
            });
        }

        await postCollection.updateOne(
            {
                _id: new ObjectId(String(data.postId)),
            },
            {
                $push: {
                    comments: {
                        ...data,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                },
            }
        );
        const createComment = await this.findPostById(data.postId);
        return createComment;
    }

    static async insertLike(data) {
        const postCollection = this.collection();

        if (validator.isEmpty(data.username)) {
            throw new GraphQLError("username is required", {
                extensions: {
                    code: "USER_BAD_INPUT",
                },
            });
        }

        await postCollection.updateOne({
            _id: new ObjectId(String(data.postId)),
        }, {
            $push: {
                likes: {
                    ...data,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            },
        });
        const createLike = await this.findPostById(data.postId);
        return createLike;
    }
}