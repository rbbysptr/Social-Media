import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
    query findAllPost{
        findAllPost{
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