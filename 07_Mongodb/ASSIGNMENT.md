# Fullstack Task Assignment

- Backend
    - listing apis
        - movies [with pagination & sort query]
        - directors [with pagination]
        - cast [with pagination]
        - movie by id
        - comments of movie by movie id
    - search
        - by title, fullplot, cast, genre, [top 20 matched]

- Frontend
  - The Homepage will contain the most recent 20 movies [pagination]
  - On top, there will be a search bar where user can search, and page will show the results
  - In the Page Header, there will be two links [Directors, Actors]
    - List of Directors page will show [directors api]
    - List of Actors page will show [cast api]
  - When a user clicks on a single movie, a new page will open
    - Show Movie Information
      - Title
      - Poster
      - Plot
      - Full Plot
      - Cast 
      - Directors 
      - Ratings [imdb]
      - Rated
      - Comments [get comments by comments api]

Upload your project in a public repo and send the link to
surajtiwari020@gmail.com with Subject "[YOUR_NAME] Assignment"

      
# Hints

```js
// pagination
const page = parseInt(req.query.page || 1)
const itemPerPage = 10
const results = await model.find().skip(itemPerPage * (page - 1)).limit(itemPerPage)
/**
 * page = 1, skip = 0
 * page = 2, skip = 10
 * page = 3, skip = 20
 */
return results
```

```js
// unique fields
model.distinct("directors") // or actors
```

```js
// search
model.find({$text: {$search: "user text here"}})
```

```js
// movies collection
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Movie schema
const movieSchema = new Schema(
    {
        plot: { type: String },
        genres: [{ type: String }],
        runtime: { type: Number },
        cast: [{ type: String }],
        num_mflix_comments: { type: Number },
        poster: { type: String },
        title: { type: String, required: true },
        fullplot: { type: String },
        languages: [{ type: String }],
        released: { type: Date },
        directors: [{ type: String }],
        writers: [{ type: String }],
        awards: {
            wins: { type: Number },
            nominations: { type: Number },
            text: { type: String }
        },
        lastupdated: { type: Date },
        year: { type: Number },
        imdb: {
            rating: { type: Number },
            votes: { type: Number },
            id: { type: Number }
        },
        countries: [{ type: String }],
        type: { type: String }
    },
);

const Movie = mongoose.model('movies', movieSchema);
module.exports = Movie;
```


```js
// comments collection
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Comment schema
const commentSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true }, // Reference to the Movie collection
        text: { type: String, required: true },
        date: { type: Date, required: true }
    }
);

const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;
```
hf 14a simaid -t 3 --uid 044D0852ec7580 --aid 0102030405 --ats 0F788071020031c173c84000009000 --selectaid_response B0060501B47436
