import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
query findUserById($id:ID!){
    findUserById(_id: $id){
        _id
        name
        username
        email
        password
    }
}
`;