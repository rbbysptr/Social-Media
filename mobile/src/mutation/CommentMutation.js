import { gql } from "@apollo/client";

export const COMMENT_ADD = gql`
    mutation CreateComment($commentNew: CommentNew){
    createComment(commentNew: $commentNew){
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
        author {
            _id
            name
            email
        }
    }
}
`;