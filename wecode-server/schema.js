const { GraphQLObjectType, GraphQLString, GraphQLInt, 
    GraphQLList, GraphQLSchema, GraphQLNonNull,
    Grap 
    } = require('graphql');
const { GraphQLUpload } = require('graphql-upload');
const { createWriteStream } = require('fs');

const RootQueryType = require('./QueryTypes/rootqueries');
const MutationQueryType = require('./QueryTypes/mutations');



// const storeUpload = ({stream, filename}) => {
//     new Promise((resolve, reject) => {
//         stream.pipe(createWriteStream(filename))
//         .on("finish", () => resolve())
//         .on("error" ,reject)
//     });
// }

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: MutationQueryType
});

module.exports = schema;

