const redis = require("../config/redis");
const Post = require("../models/Posts");

const resolvers = {
    Query: {
        findAllPost: async (_, __, contextValue) => {
            await contextValue.authentication();
            const cache = await redis.get("posts");
            if (cache) {
                return JSON.parse(cache);
            }
            const result = await Post.findAllPost();
            await redis.set("posts", JSON.stringify(result));
            return result;
        },
        findPostById: async (_, args, contextValue) => {
            await contextValue.authentication();
            const { _id } = args;
            const result = await Post.findPostById(_id);
            return result;
        }
    },
    Mutation: {
        createPost: async (_, args, contextValue) => {
            const decodeToken = await contextValue.authentication();
            const postNew = args.postNew;
            const result = await Post.insertPost({
                ...postNew,
                authorId: decodeToken._id,
            });
            await redis.del("posts");
            return result;
        },
        createComment: async (_, args, contextValue) => {
            const decodeToken = await contextValue.authentication();
            const commentUser = decodeToken.username;
            const commentNew = args.commentNew;
            commentNew.username = commentUser;
            const result = await Post.insertComment(commentNew);
            await redis.del("posts");
            return result;
        },
        createLike: async (_, args, contextValue) => {
            const decodeToken = await contextValue.authentication();
            const likeUser = decodeToken.username;
            const likeNew = args.likeNew;
            likeNew.username = likeUser;
            const result = await Post.insertLike(likeNew);
            await redis.del("posts");
            return result;
        },
    },
};

module.exports = resolvers;
