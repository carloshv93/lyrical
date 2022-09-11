
This is an API for music, where you can add songs and then add lyrics to your songs, that way you are going to be able to see the lyrics of your favorite songs anytime.

## Installation

run the following commands:

```bash
npm install
```

## Usage

Start the "database" service (JSON-Server)

```bash
npm run db
```

Then start the graphql server

```bash
npm run dev
```

then go to http://localhost:4000/graphql

Here is a list of the queries and mutations you can use:

```
mutation addSong($title:String){
  addSong(title:$title){
    id
    title
    lyrics{
      id
      likes
      content
    }
  }
}
mutation likeLyric($lyricId:ID!){
  likeLyric(id:$lyricId){
    id
    likes
    content
    song{
      id
      title
    }
  }
}
mutation deleteSong($songId:ID!){
  deleteSong(id:$songId){
    id
    title
    lyrics{
      id
      likes
      content
    }
  }
}


mutation addLyricsToSong($content:String, $songId:ID){
  addLyricToSong(content: $content, songId:$songId){
    id
    content
    likes
    song {
      title
    }
  }
}

query getSongs{
  songs{
    id
    title
    lyrics {
      id
      content
      likes
    }
  }
}

query getSong($songId: ID!){
  song(id:$songId){
    id
    title
    lyrics {
      id
      content
      likes
    }
  }
}

query getLyrics{
  lyrics{
    id
    likes
    content
    song{
      id
      title
    }
  }
}

```