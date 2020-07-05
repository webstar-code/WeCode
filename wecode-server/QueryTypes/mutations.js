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
                const user = new UserProfile(args);
                return user.save();
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
                PostImageRef: { type: GraphQLString },
                caption: { type: GraphQLString },
                createdAt: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                console.log(args);
                const post = new Post(args);
                UserProfile.findOne({ Userid: args.Userid }, (err, user) => {

                    user.post.push(post);
                    user.save();
                })
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
                UserProfile.updateOne({'Userid': args.puid },
                {$push: {"post.$[outer].comments": newcomment}},
                {"arrayFilters": [{"outer._id": mongoose.Types.ObjectId(args.pid)}]}, (err, doc) => {
                   if(err) {
                       console.log(err);
                   }
                    console.log(doc);
                })

            }
        }
    }
})

module.exports = MutationQueryType