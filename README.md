# Assignment 2 - Web API.
Name: Dermot Grace (20081469)

## Overview
The web API follows on from the first assignment and most of the calls to the movie database online have been replaced with calls to the API instead.
The exceptions are calls to get images, upcoming movies and top rated movies.

The API provides protection against getting access to the app via all routes and will only allow logged in users to access the routes. If users are attempting to access routes without a valid login then an error will be shown and the user shown a link to log in/sign up.

The API is contained in the folder node_lab2 and was built as an extension of the work done in the labs.

All other lab work is contained in the other folders.

## Installation Requirements

The repo can be cloned from: https://github.com/Dermo909/ewd-api-labs-2021.git

This can be achieved using the github desktop application or via a terminal window(in the directory you want the repository created)

```bat
https://github.com/Dermo909/ewd-api-labs-2021.git
```

Open the each folder in visual studio code and execute the following command in the terminal: 
```bat
npm install
```
The API requires an installation/instance of mongoDB to function correctly. This can be downloaded directly from:
```bat
https://www.mongodb.com/try/download/compass
```

## API Configuration

A configuration file will need to be created in the root directory of the node_lab2 folder. This file should be called ``.env```with the following variables in it:
```bat
NODE_ENV=development
PORT=8080
HOST=Localhost/other
mongoDB=YourMongoURL
seedDb=true
secret=YourJWTSecret
```

## Startup
The API can be started using the command 
```bat
npm start
```

The app can be stopped by pressing CTRL-C on the terminal window. Select 'Y' then to confirm.

## API design
The following routes are used in the API:
| PATH                          | GET                       | POST                          | PUT  | DELETE |
| ----------------------------- | ------------------------- | ----------------------------- | ---- | ------ |
| /api/movies                   | Gets a list of movies     | N/A                           | N/A  | N/A    |
| /api/movies/{movieid}         | Get movie details         | N/A                           | N/A  | N/A    |
| /api/movies/{movieid}/reviews | N/A                       | Create a new review for Movie | N/A  | N/A    |
| /api/users                    | Get all users             | Create/login a user           | N/A  | N/A    |
| /api/{username}/favourites    | Gets users favourites     | Adds a favourite for the user | N/A  | N/A    |
| /api/{username}/watchlist     | Gets users watchlist      | Adds a movie to watchlist     | N/A  | N/A    |
| /api/genres                   | Get all genres            | N/A                           | N/A  | N/A    |
| /api/reviews                  | Get all reviews for movie | N/A                           | N/A  | N/A    |
| /api/reviews                  | Get all reviews for movie | N/A                           | N/A  | N/A    |
| /api/reviews                  | Get all reviews for movie | N/A                           | N/A  | N/A    |
| /api/castAndCrew              | Get cast and crewfor movie| N/A                           | N/A  | N/A    |
| /api/docs                     | Get swagger docs for API  | N/A                           | N/A  | N/A    |

## Security 
After logging in, a token will be returned to the app which is stored in both localstorage and in the auth context. The isAuthenticated state of auth context will be set to true(if authentication was successful). User name of the logged in user will also be stored in local storage. This is as a helper for the addition of reviews to auto populate the author field.

All routes are protected before the user logs in and if a user attempts to visit one of the routes then they will be presented with an error message and a link to log in. The site header will not contain any links to the routes if there is not a valid logged in user(auth context isAuthenticated state is used)
```bat
                {auth.isAuthenticated ? menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt)}
                  >
                    {opt.label}
                  </Button>)
                )  : (<Link to={`/login`} style={{ textDecoration: 'none' }}>Sign In</Link>)
                }
```

All Get/Post operations to the API have the users token contained in the header and a switch statement is performed on the result status. All results other than 200(success) will send the user to an 'oops, something went wrong' page with a login link: 
```bat
export const getMovie = async (id) => {
    const url = `/api/movies/${id}`;

    const res = await fetch(
        url, {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
    }
    )
    switch(res.status) {
        case 200: return res.json();
        default: window.location.href = '/oops'; break;
    }
  };
```

## Data Design
The collections used in the app cover the following:
User Model(extended from labs): Contains a favourites and watchlist members which each contain a reference to a movie using the ObjectId
```bat
const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }],
    watchlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }]
});
```

Review Model(newly developed): This model contains the details needed to support users adding reviews against movies. The review model contains the various details for a review and a reference to the movie the review is for:
```bat
const ReviewSchema = new Schema({
    author: { type: String },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'},
    content: { type: String },
    created_at: {type: Date},
    rating: { type: Number }
});
```

Movie Model(extended from labs): The movie model contains all the details needed to show a movies information on screen. The model contains a reference to a user review:
```bat
const MovieSchema = new Schema({
  id: { type: Number },
  ... other information
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'}],
	... etc
});
```

Genre Model: Contains information regarding genres for movies. Each movie contains a list of genres.

Cast and crew model(newly developed): This model contains the information needed to display cast and crew information for each movie. This model does not contain an object Id for the movie as it changes each time the movie data is seeded in the database. The movie number is used as a lookup in this case.
```bat
const CastAndCrewSchema = new Schema({
    id: { type: Number },
    cast: [{
        adult: { type: Boolean },
        gender: { type: Number },
        id: { type: Number },
        known_for_department: { type: String },
        name: { type: String },
        original_name: { type: String },
        profile_path: { type: String },
        cast_id: { type: Number },
        character: { type: String },
        credit_id: { type: String },
        order: { type: Number }
    }],
    crew: [{
        adult: { type: Boolean },
        gender: { type: Number },
        id: { type: Number },
        known_for_department: { type: String },
        name: { type: String },
        original_name: { type: String },
        profile_path: { type: String },
        cast_id: { type: Number },
        character: { type: String },
        credit_id: { type: String },
        order: { type: Number }
    }]
});
```

## Integration with React App
Since the app had already been developed using methods to fetch data from the online movie database, each method was in turn replaced with its equivalent for the API.

An example would be getMovies:
```bat
// API 
export const getMovies = async () => {
    const res = await fetch(
        '/api/movies', {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
    }
    )

    return res.json();
};

// Non API version
export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-GB&include_adult=false&page=1`
  )
    .then(res => res.json())
    .then(json => { 
      json.results.forEach(x => {
        x.vote_average = convertToPercentage(x.vote_average);
      });

      return json.results; });
};
```

## Features
1. Login
  * Added authcontext
  * Verifying user is logged in before showing movies

2. Movies
  * Getting movies from api
  * seeding DB with cast and crew data
  * Getting cast and crew from api

3. Favourites
  * Restrict to logged in folks
  * Add movie to favourites
  * Show favourites
	
4. Watchlist	
  * Restrict to logged in folks
  * Add movie to watchlist
  * Show watchlist 

5. Top rated movies
  * restrict to logged in folks
	
6. Error handling
  * oops/unathorised page

7. Reviews
  * Add review model
  * Add review(save to DB)
  * Show review on movie page
	
8. Header
  * Only show header menu when logged in
  * Show logout link when logged in 