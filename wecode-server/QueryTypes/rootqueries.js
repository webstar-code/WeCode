const { GraphQLObjectType, GraphQLString, GraphQLInt,
    GraphQLList, GraphQLSchema, GraphQLNonNull,
    Grap
} = require('graphql');
const { AccountType, UsersType, PostType, QuestionType } = require('../Types/ObjectTypes')

const User = require('../DBSchema/UserSchema');
const UserProfile = require('../DBSchema/UserProfileSchema');
const Post = require('../DBSchema/PostSchema');
const Img = require('../DBSchema/ImgSchema');
const Question = require('../DBSchema/QuestionSchema');

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
        },
     

    }
});

module.exports = RootQueryType