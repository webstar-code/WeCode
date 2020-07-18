const { GraphQLObjectType, GraphQLString, GraphQLInt,
    GraphQLList, GraphQLSchema, GraphQLNonNull,

} = require('graphql');
const { AccountType, UsersType, PostType, QuestionType, CommentType, TimelineType } = require('../Types/ObjectTypes')

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
                Userid: { type: GraphQLString },
                displayname: { type: GraphQLString }

            },
            resolve: (parent, args) => {
                if (args.Userid) {
                    return UserProfile.findOne({ Userid: args.Userid }).exec();
                } else {
                    return UserProfile.findOne({ displayname: args.displayname }).exec();
                }
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
            type: (PostType),
            description: "get currnet user a timeline",
            args: {
                Userid: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                console.log(args.Userid);
                UserProfile.findOne({ Userid: args.Userid }, (err, user) => {
                    const following = user.following;
                    following.map(x => {
                        const a = x.displayname;
                        UserProfile.findOne({ displayname: a }, (err, fuser) => {
                            if (err) {
                                console.log(err);
                            }
                            // Clear and push
                            user.timeline.splice(0, user.timeline.length);
                            fuser.post.map(post => {
                                user.timeline.push(post);

                            })
                            user.save()
                        })
                    })
                })
                // GEt updated USerProfile
                return UserProfile.findOne({ Userid: args.Userid }).exec();

            },





        },


    }

});

module.exports = RootQueryType