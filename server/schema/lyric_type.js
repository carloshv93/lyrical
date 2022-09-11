const axios = require("axios");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } = graphql;

const LyricType = new GraphQLObjectType({
  name: "LyricType",
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: require("./song_type"),
      resolve(parentValue) {
        return axios
          .get(`http://localhost:3000/songs/${parentValue.songId}`)
          .then((res) => res.data);
      },
    },
  }),
});

module.exports = LyricType;
