import { gql } from "@apollo/client";

export const GET_USER_BY_USERNAME = gql`
query findUserByUsername($username:String!){
    findUserByUsername(username:$username){
        _id
        email
        name
        username
    }
}
`;