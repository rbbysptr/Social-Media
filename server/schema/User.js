const typeDefs = `#graphql
    #pascal case & singular
    type User {
        _id: ID
        name: String
        username: String
        email: String
        password: String
        Followers:[FollowersDetail]
        Following:[FollowingDetail]
    }
    type LoginUser {
        access_token: String
        email: String
    }

    input userNew {
        name: String
        username: String!
        email: String!
        password: String!
    }
    type FollowersDetail {
        _id:ID
        followingId:ID
        followerId:ID
        createdAt: String
        updatedAt: String
    }
    type FollowingDetail{
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }
    type Query {
        findAllUser: [User]
        findUserById(_id: ID!): User
        findUserByUsername(username: String!): [User]
        findLoginUserCurrent: User
    }
    type Mutation {
        register(userNew: userNew): User
        login(email: String!, password: String!): LoginUser
    }
`;

module.exports = typeDefs;
