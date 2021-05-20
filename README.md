# Assignment 2 - Web API.
Name: Dermot Grace (20081469)

## Overview
The web API follows on from the first assignment and most of the calls to the movie database online have been replaced with calls to the API instead.
The exceptions are calls to get images, upcoming movies and top rated movies.

The API provides protection against getting access to the app via all routes and will only allow logged in users to access the routes. If users are attempting to access routes without a valid login then an error will be shown and the user shown a link to log in/sign up.

The API is contained in the folder node_lab2 and was built as an extension of the work done in the labs.

All other lab work is contained in the other folders.

## Installation Requirements

The repo can be cloned from : https://github.com/Dermo909/ewd-api-labs-2021.git

Open the each folder in visual studio code and execute the following command in the terminal: 
```bat
npm install
```

## API Configuration
