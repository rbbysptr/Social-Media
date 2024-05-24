import { gql } from "@apollo/client";

export const LOGIN_USER_CURRENT = gql`
query findLoginUserCurrent {
    findLoginUserCurrent{
    _id
    name
    username
    email
    password
    Followers {
        _id
        followingId
        followerId
        createdAt
        updatedAt
    }
    Following {
        _id
        followingId
        followerId
        createdAt
        updatedAt
        }
    }
}
`;