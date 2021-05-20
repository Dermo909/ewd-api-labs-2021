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