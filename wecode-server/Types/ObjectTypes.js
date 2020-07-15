const { GraphQLObjectType, GraphQLString, GraphQLInt,
    GraphQLList, GraphQLSchema, GraphQLNonNull, GraphQLScalarType,

} = require('graphql');
const { GraphQLUpload } = require('graphql-upload');

const AccountType = new GraphQLObjectType({
    name: "AccoutnType",
    description: "this is to get accounts",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    })
})

const FollowingType = new GraphQLObjectType({
    name: 'following',
    description: 'show following',
    fields: () => ({
        displayname: { type: GraphQLString }
    })
})


const UsersType = new GraphQLObjectType({
    name: "UsersType",
    description: "This is users query",

    fields: () => ({
        _id: { type: GraphQLString },
        Userid: { type: GraphQLString },
        displayname: { type: GraphQLString },
        name: { type: GraphQLString },
        about: { type: GraphQLString },
        profession: { type: GraphQLString },
        education: { type: GraphQLString },
        ProfileImgref: { type: GraphQLString},
        post: { type: new GraphQLList(PostType) },
        following: { type: new GraphQLList(FollowingType) },
        followers: { type: new GraphQLList(FollowingType) },
        timeline: {type: new GraphQLList(TimelineType)}
    })

})

const PostType = new GraphQLObjectType({
    name: "PostType",
    description: "this is for making posts",
    fields: () => ({
        _id: {type: GraphQLString}, 
        Userid: { type: GraphQLString },
        displayname: { type: GraphQLString },
        bgcolor: { type: GraphQLString },
        bgcaption: { type: GraphQLString },
        ProfileImgref: { type: GraphQLString },
        PostImgref: { type: GraphQLString },
        caption: { type: GraphQLString },
        likes: { type: GraphQLInt },
        comments:  { type: new GraphQLList(CommentType) },
        createdAt: { type: GraphQLString },
    })
});

const QuestionType = new GraphQLObjectType({
    name: "QusetionType",
    description: "this is for making posts",
    fields: () => ({
        _id: {type: GraphQLString},
        Userid: { type: GraphQLNonNull(GraphQLInt) },
        displayname: { type: GraphQLString },
        PostImgRef: { type: GraphQLString },
        caption: { type: GraphQLString },
        createdAt: { type: GraphQLString },
    })
});

const CommentType = new GraphQLObjectType({
    name: "CommentType",
    description: "this is for comments",
    fields: () => ({
        _id: {type: GraphQLString},
        pid: {type: GraphQLString},
        puid: {type: GraphQLString},
        displayname: { type: GraphQLString },
        comment: { type: GraphQLString },
        likes: { type: GraphQLString },
        reply: { type: new GraphQLList(CommentType) },
        createdAt: { type: GraphQLString }
    })
})


const TimelineType = new GraphQLObjectType({
    name: "TimelineType",
    description: "this is for get timeline",
    fields: () => ({
        pid: {type: GraphQLString},
        _id: {type: GraphQLString}, 
        Userid: { type: GraphQLString },
        displayname: { type: GraphQLString },
        bgcolor: { type: GraphQLString },
        bgcaption: { type: GraphQLString },
        ProfileImgref: { type: GraphQLString },
        PostImgRef: { type: GraphQLString },
        caption: { type: GraphQLString },
        likes: { type: GraphQLString },
        comments:  { type: new GraphQLList(CommentType) },
        createdAt: { type: GraphQLString },
    })
})
const ImageType = new GraphQLObjectType({
    name: "ImageType",
    description: "images",
    fields: () => ({
        Userid: { type: GraphQLString },
        ProfileImgref: { type: GraphQLString }
    })
})

module.exports = {
    AccountType: AccountType,
    UsersType: UsersType,
    PostType: PostType,
    QuestionType: QuestionType,
    FollowingType: FollowingType,
    CommentType: CommentType,
    TimelineType: TimelineType
}