import userModel from '../api/users/userModel';
import movieModel from '../api/movies/movieModel';
import genreModel from '../api/genres/genreModel';
import { movies } from './movies';
import { users } from './users';
import { genres } from './genres';

// deletes all user documents in collection and inserts test data
// async function loadUsers() {
//   console.log('load user Data');
//   try {

//     await userModel.deleteMany();
//     await userModel.collection.insertMany(users);
//     console.info(`${users.length} users were successfully stored.`);
//   } catch (err) {
//     console.error(`failed to Load user Data: ${err}`);
//   }
// }
async function loadUsers() {
  try {
    await userModel.collection.drop();
    users.forEach(user =>  userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}

// deletes all movies documents in collection and inserts test data
async function loadMovies() {
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

// Load genres
async function loadGenres() {
  try {
    await genreModel.deleteMany();
    await genreModel.collection.insertMany(genres);
    console.info(`${genres.length} Genres were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load Genre Data: ${err}`);
  }
}

if (process.env.seedDb) {
  loadUsers();
  loadMovies();
  loadGenres();
}