const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const SongType = require("./song_type");
const LyricType = require("./lyric_type");
const { default: axios } = require("axios");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    songs: {
      type: GraphQLList(SongType),
      resolve() {
        return axios("http://localhost:3000/songs").then((res) => res.data);
      },
    },
    song: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        console.log("id", id);
        return axios(`http://localhost:3000/songs/${id}`).then(
          (res) => res.data
        );
      },
    },
    lyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return axios(`http://localhost:3000/lyrics/${id}`).then(
          (res) => res.data
        );
      },
    },
    lyrics: {
      type: GraphQLList(LyricType),
      resolve(parnetValue) {
        return axios(`http://localhost:3000/lyrics`).then((res) => res.data);
      },
    },
  }),
});

module.exports = RootQuery;
