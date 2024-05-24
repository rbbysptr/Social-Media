const Follow = require("../models/follow");

const resolvers = {
    Mutation: {
        followUser: async (_, args, contextValue) => {
            const userCurrent = await contextValue.authentication();
            const followerId = userCurrent._id;
            const { followingId } = args;
            const result = await Follow.createFollow({
                followingId,
                followerId,
            });
            return result
        },
    },
};

module.exports = resolvers;