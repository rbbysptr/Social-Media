import { gql } from "@apollo/client";

export const POST_ADD = gql`
    mutation CreatePost($postNew : PostNew){
    createPost(postNew:$postNew){
        _id
        content
        imgUrl
        authorId
        }
    }
`;