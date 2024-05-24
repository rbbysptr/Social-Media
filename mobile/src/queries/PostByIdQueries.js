import { gql } from "@apollo/client";

export const GET_POSTS_BY_ID = gql`
    query findPostById($id:ID!){
    findPostById(_id:$id){
    _id
    content
    tags
    authorId
    imgUrl
    comments {
            content
            username
        }
    likes{
        username
        }
    author{
            _id
            name
            email
        }
    }
}
`;