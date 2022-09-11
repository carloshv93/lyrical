const { default: axios } = require("axios");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = graphql;
const LyricType = require("./lyric_type");

const SongType = new GraphQLObjectType({
  name: "SongType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    lyrics: {
      type: GraphQLList(LyricType),
      resolve(parentValue) {
        return axios(
          `http://localhost:3000/songs/${parentValue.id}/lyrics`
        ).then((res) =>  res.data);
      },
    },
  }),
});

module.exports = SongType;
