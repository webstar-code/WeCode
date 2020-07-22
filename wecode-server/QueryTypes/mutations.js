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
const QuestionSchema = require('../DBSchema/QuestionSchema');
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

        Question: {
            type: QuestionType,
            description: "This is for createing Questions",
            args: {
                Userid: { type: GraphQLString },
                displayname: { type: GraphQLString },
                question: { type: GraphQLString },
                description: { type: GraphQLString },
                tags: { type: new GraphQLList(GraphQLString) },
                createdAt: { type: GraphQLString },
            },
            resolve: (parent, args) => {
                console.log(args);
                const question = new QuestionSchema(args);
                UserProfile.findOne({ Userid: args.Userid }, (err, user) => {
                    user.question.push(question);
                    user.save();
                })
                return question;
            }
        },
        like: {
            type: new GraphQLObjectType({
                name: "Likes",
                fields: () => ({
                    _id: { type: GraphQLString },
                    Userid: { type: GraphQLString }
                })
            }),
            description: "Get likes",
            args: {
                _id: { type: GraphQLString },
                Userid: { type: GraphQLString },
                contentType: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                if (args.contentType === 'post') {
                    console.log(args);

                    const Userid = { Userid: args.Userid }
                    UserProfile.updateOne({ 'Userid': args.Userid },
                        { $push: { "post.$[outer].likes": Userid } },
                        { "arrayFilters": [{ "outer._id": mongoose.Types.ObjectId(args._id) }] }, (err, doc) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log(doc);
                        })
                } else if (args.contentType === 'question') {
                    console.log(args);
                    const Userid = { Userid: args.Userid }
                    UserProfile.updateOne({ 'Userid': args.Userid },
                        { $push: { "question.$[outer].stars": Userid } },
                        { "arrayFilters": [{ "outer._id": mongoose.Types.ObjectId(args._id) }] }, (err, doc) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log(doc);
                        })
                }

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
        Removelike: {
            type: new GraphQLObjectType({
                name: "RemoveLikes",
                fields: () => ({
                    _id: { type: GraphQLString },
                    Userid: { type: GraphQLString },

                })
            }),
            description: "Remove likes",
            args: {
                _id: { type: GraphQLString },
                Userid: { type: GraphQLString },
                contentType: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                if (args.contentType === 'post') {
                    UserProfile.updateOne({ 'Userid': args.Userid },
                        { $pull: { "post.$[outer].likes": { 'Userid': args.Userid } } },
                        { "arrayFilters": [{ "outer._id": mongoose.Types.ObjectId(args._id) }] }, (err, doc) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log(doc);
                        })
                } else if (args.contentType === 'question') {
                    const Userid = { Userid: args.Userid }
                    UserProfile.updateOne({ 'Userid': args.Userid },
                        { $pull: { "question.$[outer].stars": Userid } },
                        { "arrayFilters": [{ "outer._id": mongoose.Types.ObjectId(args._id) }] }, (err, doc) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log(doc);
                        })
                }
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
                _id: { type: GraphQLString },
                Userid: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                console.log(args);
                UserProfile.updateOne({ Userid: args.Userid },
                    { $pull: { 'post': { '_id': mongoose.Types.ObjectId(args._id) } } },
                    { multi: true }

                ).then(() => {
                    console.log("upadteOne")
                })
            }
        },

        Addfollowing: {
            type: UsersType,
            description: "Add following",
            args: {
                AdminUserid: { type: GraphQLString },
                Admindisplayname: { type: GraphQLString },
                AdminProfileImgref: { type: GraphQLString },
                Userid: { type: GraphQLString },
                displayname: { type: GraphQLString },
                ProfileImgref: { type: GraphQLString },
            },
            resolve: (parent, args) => {
                console.log(args);
                const following = {
                    Userid: args.Userid,
                    displayname: args.displayname,
                    ProfileImgref: args.ProfileImgref
                };
                const follower = {
                    Userid: args.AdminUserid,
                    displayname: args.Admindisplayname,
                    ProfileImgref: args.AdminProfileImgref,
                }
                UserProfile.findOne({ Userid: args.AdminUserid }, (err, user) => {
                    user.following.push(following);
                    user.save();
                })

                UserProfile.findOne({ Userid: args.Userid }, (err, user) => {
                    user.followers.push(follower);
                    user.save();
                })
            }
        },

        Removefollowing: {
            type: UsersType,
            description: "Remove following",
            args: {
                AdminUserid: { type: GraphQLString },
                Userid: { type: GraphQLString },
                displayname: { type: GraphQLString },
                ProfileImgref: { type: GraphQLString },
            },
            resolve: (parent, args) => {
                console.log(args);
                UserProfile.updateOne({ Userid: args.AdminUserid },
                    { $pull: { 'following': { 'displayname': args.displayname } } },
                    { multi: true }

                ).then(() => {
                    console.log("upadteOne")
                })
                UserProfile.updateOne({ Userid: args.Userid },
                    { $pull: { 'followers': { 'Userid': args.AdminUserid } } },
                    { multi: true }

                ).then(() => {
                    console.log("upadteOne")
                })
            }
        },

    }
})

module.exports = MutationQueryType