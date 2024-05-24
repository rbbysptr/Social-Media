import { gql } from "@apollo/client";


export const ADD_LIKE = gql`
    mutation CreateLike($likeNew: LikeNew) {
    createLike(likeNew: $likeNew) {
        _id
        content
        tags
        authorId
        imgUrl
        comments {
            content
            username
        }
        likes {
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