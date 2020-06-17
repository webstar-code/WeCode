const { GraphQLObjectType, GraphQLString, GraphQLInt, 
    GraphQLList, GraphQLSchema, GraphQLNonNull, 
    } = require('graphql');
const { GraphQLUpload } = require('graphql-upload');
const mongoose = require('mongoose');
const User = require('./Schema/UserSchema');
const UserProfile = require('./Schema/UserProfileSchema');
const Post = require('./Schema/PostSchema');
const Question = require('./Schema/QuestionSchema');

const UsersType = new GraphQLObjectType({
    name: "UsersType",
    description: "This is users query",
    fields: () => ({
        Userid: { type: GraphQLInt },
        displayname: { type: GraphQLString },
        name: { type: GraphQLString },
        about: { type: GraphQLString },
        profession: { type: GraphQLString },
        university: { type: GraphQLString },
        ProfileImage: { type: GraphQLUpload },
        
    })
})

const PostType = new GraphQLObjectType({
    name: "PostType",
    description: "this is for making posts",
    fields: () => ({
    Userid: { type: GraphQLNonNull(GraphQLInt) },
    displayname: { type: GraphQLString },
    PostImageRef: { type: GraphQLString },
    caption: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    })
});

const QuestionType = new GraphQLObjectType({
    name: "QusetionType",
    description: "this is for making posts",
    fields: () => ({
    Userid: { type: GraphQLNonNull(GraphQLInt) },
    displayname: { type: GraphQLString },
    PostImageRef: { type: GraphQLString },
    caption: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    })
});

const AccountType = new GraphQLObjectType({
    name: "AccoutnType",
    description: "this is to get accounts",
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
    })
})


const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    description: "This is root query",
    fields: {
        account: {
            type: new GraphQLList(AccountType),
            description: "get acoounts",
            resolve: () => User.find().exec()
            
        },
        users: {
            type: new GraphQLList(UsersType),
            description: "get users",
            resolve: () => UserProfile.find().exec()
        },
        user: {
            type: UsersType,
            description: "get a single user",
            args: {
                displayname: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                return UserProfile.findOne({ displayname: args.displayname }).exec();
            }
        },
        posts: {
            type: PostType,
            description: "this is for getting posts",
            resolve: () => Post.find().exec()
        },
        post: {
            type: PostType,
            description: "get a single post",
            args: {
                displayname: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                return Post.findOne({ displayname: args.displayname }).exec();
            }
        },
        questions: {
            type: QuestionType,
            description: "this is for getting questions",
            resolve: () => Question.find().exec()
        },
        question: {
            type: QuestionType,
            description: "get a single question",
            args: {
                displayname: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                return Question.findOne({ displayname: args.displayname }).exec();
            }
        }

    }
});

const MutationQueryType = new GraphQLObjectType({
    name: "mutation",
    description: "This is MutationQueryType",
    fields: {
        user: {
            type: UsersType,
            description: "create a user",
            args: {
                Userid: { type: GraphQLNonNull(GraphQLInt) },
                displayname: { type: GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLNonNull(GraphQLString) },
                about: { type: GraphQLString },
                profession: { type: GraphQLString },
                university: { type: GraphQLString },
                ProfileImage: {
                    type: GraphQLUpload
                 }
            },
            resolve: (parent, args) => {
                // const { ProfileImage, ...data } = args;
                // const { filename, mimetype, createReadStream} = await ProfileImage;
                // const stream = createReadStream();
                // stream.on
                const user = new UserProfile(args);
                return user.save();
            }
        },
        post: {
            type: PostType,
            description: "This is for createing Post",
            args: {
                Userid: { type: GraphQLNonNull(GraphQLInt) },
                displayname: { type: GraphQLString },
                PostImageRef: { type: GraphQLString },
                caption: { type: GraphQLString },
                createdAt: { type: GraphQLString },
            },
            resolve: (parent, args) => {
                const post = new Post(args);
                return post.save();
            }
        },
        question: {
            type: QuestionType,
            description: "This is for createing Questions",
            args: {
                Userid: { type: GraphQLNonNull(GraphQLInt) },
                displayname: { type: GraphQLString },
                question: { type: GraphQLString },
                createdAt: { type: GraphQLString },
            },
            resolve: (parent, args) => {
                const question = new Question(args);
                return question.save();
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: MutationQueryType
});

module.exports = schema;

