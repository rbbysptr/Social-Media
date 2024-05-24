const typeDefs = `#graphql
    #pascal case & singular
    type Follow {
        _id: ID
        followingId: String
        followerId: String
        following: FollowDetail
        follower: FollowerDetail
        createdAt: String
        updatedAt: String
    }
    type FollowDetail {
        _id: ID
        name: String
        email: String
    }
    type FollowerDetail{
        _id: ID
        name: String
        email: String
    }
    type Mutation {
        followUser(followingId: ID!): Follow
    }
`;

module.exports = typeDefs;
