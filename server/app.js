if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}
const { ApolloServer } = require("@apollo/server");
const { GraphQLError } = require("graphql");
const { startStandaloneServer } = require('@apollo/server/standalone');
const jwt = require("jsonwebtoken");

const postTypeDefs = require('./schema/Posts');
const userTypeDefs = require('./schema/User');
const followTypeDefs = require('./schema/Follow');

const postResolver = require('./resolvers/Posts');
const userResolver = require('./resolvers/User');
const followResolver = require('./resolvers/Follow');

const server = new ApolloServer({
    //dapat disingkat bila nama variable dan key nya sama
    //karena lebih dari 1 typeDefs kita gunakan array
    typeDefs: [postTypeDefs, userTypeDefs, followTypeDefs],
    resolvers: [postResolver, userResolver, followResolver],
    introspection: true //agar bisa diakses via sandbox ketika sudah production
});

//menggunakan promise
startStandaloneServer(server, {
    listen: { port: process.env.PORT || 3000 },
    context: async ({ req, res }) => {
        return {
            authentication: async () => {
                if (!req.headers.authorization) {
                    throw new GraphQLError("access token must be provided", {
                        extensions: {
                            code: "Unauthorized"
                        },
                    });
                }
                const accessToken = req.headers.authorization.split(" ")[1];
                if (!accessToken) {
                    throw new GraphQLError("access token must be provided", {
                        extensions: {
                            code: "Unauthorized",
                        },
                    });
                }
                const decodeToken = jwt.verify(accessToken, process.env.JWT_SECRET);
                if (!decodeToken) {
                    throw new GraphQLError("access token must be valid", {
                        extensions: {
                            code: "Unauthorized"
                        },
                    });
                }
                return decodeToken;
            }
        }
    }
}).then(({ url }) => {console.log(`🚀  Server ready at: ${url}`);
}).catch(err => console.log(err))


