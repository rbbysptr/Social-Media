import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
mutation Register($userNew: userNew){
register(userNew : $userNew){
    _id
    name
    username
    email
    password
    }
}
`;