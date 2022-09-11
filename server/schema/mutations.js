const graphql = require("graphql");
const axios = require("axios");
const uuid = require("uuid");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const SongType = require("./song_type");
const LyricType = require("./lyric_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString },
      },
      resolve(parentValue, { title }) {
        const id = uuid.v4();
        return axios
          .post(`http://localhost:3000/songs`, { id, title })
          .then((res) => res.data);
      },
    },
    addLyricToSong: {
      type: LyricType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID },
      },
      resolve(parentValue, { content, songId }) {
        const id = uuid.v4();
        return axios
          .post(`http://localhost:3000/lyrics`, { id, content, songId })
          .then((res) => res.data);
      },
    },
    likeLyric: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return axios(`http://localhost:3000/lyrics/${id}`).then((res) => {
          const likes = res.data.likes;
          if (likes) {
            return axios
              .patch("http://localhost:3000/lyrics/" + id, {
                likes: likes + 1,
              })
              .then((res) => res.data);
          }
          return axios
            .patch("http://localhost:3000/lyrics/" + id, {
              likes: 1,
            })
            .then((res) => res.data);
        });
      },
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return axios
          .delete(`http://localhost:3000/songs/${id}`)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = mutation;
