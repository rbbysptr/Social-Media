const typeDefs = `#graphql
    # Pascal case & singular
    type Post {
        _id: ID!
        content: String
        tags: [String]
        imgUrl: String
        authorId: String
        comments: [Comment]
        likes: [Like]
        author: Author
    }

    type Author {
        _id: ID
        name: String
        email: String
    }

    type Comment {
        content: String
        username: String
    }
    type Like {
        username: String
    }
    input PostNew {
        content: String!
        tags: [String]
        imgUrl: String
    }
    input CommentNew {
        content: String!
        postId: String!
    }
    input LikeNew {
        postId: String!
    }

    type Query {
        findAllPost: [Post]
        findPostById(_id:ID!): Post
    }

    type Mutation {
        createPost(postNew: PostNew): Post
        createComment(commentNew: CommentNew): Post
        createLike(likeNew: LikeNew): Post
    }
`;

module.exports = typeDefs;
