const { GraphQLObjectType, GraphQLString, GraphQLInt,
    GraphQLList, GraphQLSchema, GraphQLNonNull, GraphQLScalarType,

} = require('graphql');
const { AccountType, UsersType, PostType, QuestionType, FollowingType, CommentType } = require('../Types/ObjectTypes')

const mongoose = require('mongoose');
const connection = mongoose.createConnection(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
});

const User = require('../DBSchema/UserSchema');
const UserProfile = require('../DBSchema/UserProfileSchema');
const Post = require('../DBSchema/PostSchema');
const Img = require('../DBSchema/ImgSchema');
const Question = require('../DBSchema/QuestionSchema');
const { GraphQLUpload } = require('graphql-upload');
const Comment = mongoose.model('Comment', {
    pid: String,
    puid: String,
    displayname: String,
    comment: String,
    likes: String,
    reply: Array,
    createdAt: String
});
const MutationQueryType = new GraphQLObjectType({
    name: "mutation",
    description: "This is MutationQueryType",
    fields: {
        // Creating Userprofile and upadating
        user: {
            type: UsersType,
            description: "create a user",
            args: {
                Userid: { type: GraphQLString },
                displayname: { type: GraphQLString },
                name: { type: GraphQLString },
                about: { type: GraphQLString },
                profession: { type: GraphQLString },
                education: { type: GraphQLString },
                ProfileImgref: { type: GraphQLString },
                post: { type: GraphQLString },
                following: { type: GraphQLString },
                followers: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                UserProfile.findOne({ Userid: args.Userid }, (err, user) => {

                    if (user) {
                        console.log(args);
                        console.log(user);
                        user.replaceOne(args).then(() => {
                            console.log("Profile updated");
                        });

                    } else {
                        UserProfile.findOne({ displayname: args.displayname }, (err, user) => {
                            if (user) {
                                console.log("User another displayname")
                            } else {
                                const newuser = new UserProfile(args);
                                newuser.save();
                            }
                        })
                    }
                })

            }
        },

        post: {
            type: PostType,
            description: "This is for createing Post",
            args: {
                Userid: { type: GraphQLString },
                displayname: { type: GraphQLString },
                bgcolor: { type: GraphQLString },
                bgcaption: { type: GraphQLString },
                ProfileImgref: { type: GraphQLString },
                PostImgref: { type: GraphQLString },
                caption: { type: GraphQLString },
                createdAt: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                console.log(args);
                const post = new Post(args);
                UserProfile.findOne({ Userid: args.Userid }, (err, user) => {
                    console.log(user);
                    user.post.push(post);
                    user.save();
                    return post;
                })
            }
        },
        like: {
            type: PostType,
            description: "Get likes",
            args: {
                // coming from Post
                _id: { type: GraphQLString },
                Userid: { type: GraphQLString },
                // Coming from comment
                pid: { type: GraphQLString },
                puid: { type: GraphQLString },
                likes: { type: GraphQLInt },
            },
            resolve: (parent, args) => {
                console.log(args);
                UserProfile.updateOne({ 'Userid': args.Userid },
                { $set: { "post.$[outer].likes": args.likes } },
                { "arrayFilters": [{ "outer._id": mongoose.Types.ObjectId(args._id) }] }, (err, doc) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(doc);
                })

                // if (args.puid) {
                //     UserProfile.updateOne({ 'Userid': args.puid },
                //         { $set: { "post.$[outer].comments.$[inside].likes": args.likes } },
                //         {
                //             "arrayFilters": [
                //                 { "outer._id": mongoose.Types.ObjectId(args.pid) },
                //                 { "inside._id": mongoose.Types.ObjectId(args._id) }]
                //         }, (err, doc) => {
                //             if (err) {
                //                 console.log(err);
                //             }
                //             console.log(doc);
                //         })
                // } else {
                   
                // }
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
                // const question = new question(args);
                // UserProfile.findOne({ Userid: args.Userid }, (err, user) => {
                //     user.question.push(question);
                //     user.save();
                // })
                // return question;
            }
        },
        comment: {
            type: CommentType,
            description: "Create A Comment",
            args: {
                pid: { type: GraphQLString },
                puid: { type: GraphQLString },
                displayname: { type: GraphQLString },
                comment: { type: GraphQLString },
                likes: { type: GraphQLString },
                reply: { type: GraphQLString },
                createdAt: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                const newcomment = new Comment(args)
                UserProfile.updateOne({ 'Userid': args.puid },
                    { $push: { "post.$[outer].comments": newcomment } },
                    { "arrayFilters": [{ "outer._id": mongoose.Types.ObjectId(args.pid) }] }, (err, doc) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(doc);
                    })

            }
        },

        deletepost: {
            type: PostType,
            description: "delete a post",
            args: {
                _id: {type: GraphQLString},
                Userid: {type: GraphQLString}
            },
            resolve: (parent, args) => {
                console.log(args);
                UserProfile.updateOne({Userid: args.Userid},
                    { $pull: { 'post' : { '_id' :  mongoose.Types.ObjectId(args._id) } } },
                    {multi: true}
                    
                    ).then(() => {
                        console.log("upadteOne")
                    })
            }
        }
    }
})

module.exports = MutationQueryType