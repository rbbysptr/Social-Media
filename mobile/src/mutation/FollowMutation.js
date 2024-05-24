import { gql } from "@apollo/client";

export const ADD_FOLLOW = gql`
    mutation FollowUser($followingId: ID!){
    followUser(followingId:$followingId){
        _id
        followingId
        followerId
        createdAt
        updatedAt
        following {
            _id
            name
            email
        }
        follower {
            _id
            name
            email
        }
    }
}
`;