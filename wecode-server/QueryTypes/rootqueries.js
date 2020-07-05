const { GraphQLObjectType, GraphQLString, GraphQLInt,
    GraphQLList, GraphQLSchema, GraphQLNonNull,
    Grap
} = require('graphql');
const { AccountType, UsersType, PostType, QuestionType,CommentType } = require('../Types/ObjectTypes')

const User = require('../DBSchema/UserSchema');
const UserProfile = require('../DBSchema/UserProfileSchema');
const Post = require('../DBSchema/PostSchema');
const Img = require('../DBSchema/ImgSchema');
const Question = require('../DBSchema/QuestionSchema');
const Timeline = require('../DBSchema/Timeline');

const mongoose = require('mongoose');
const { query } = require('express');
const connection = mongoose.createConnection(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
});

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

        // Create A timleine
        timeline: {
            type: new GraphQLObjectType({
                name: "timeline",
                fields: () => ({
                    _id: {type: GraphQLString}, 
                    Userid: { type: GraphQLString },
                    displayname: { type: GraphQLString },
                    bgcolor: { type: GraphQLString },
                    bgcaption: { type: GraphQLString },
                    PostImageRef: { type: GraphQLString },
                    caption: { type: GraphQLString },
                    likes: { type: GraphQLString },
                    comments:  { type: new GraphQLList(CommentType) },
                    createdAt: { type: GraphQLString },
                })
            }),
            description: "create a timeline",
            args: {
                displayname: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                connection.db.dropCollection('timelines', (err, result) => {
                    console.log("Timeline deleted");
                })

                UserProfile.findOne({ displayname: args.displayname }, (err, user) => {
                    const following = user.following;
                    console.log(following);
                    following.map(x => {
                        const a = x.displayname;
                        UserProfile.findOne({ displayname: a }, (err, user) => {
                            if (err) {
                                console.log(err);
                            }
                            // Create a individual doc in Timline collection
                            Timeline.create(user.post, (err, doc) => {                                
                            })
                            // Sort it by createdAT (DAte) later 
                            Timeline.find({}).sort({Userid: -1}).exec((err, doc) => {
                                    return doc;    
                                    console.log(doc);
                            });
                        })

                    })
                })
              
            }



        }


    }
});

module.exports = RootQueryType