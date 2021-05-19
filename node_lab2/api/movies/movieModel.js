import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GenresSchema = {
  id: { type: Number },
  Name: { type: String }
};


const MovieSchema = new Schema({
  id: { type: Number },
  adult: { type: Boolean },
  belongs_to_collection: { type: String },
  budget: { type: Number },
  imdb_id: {type: String},
  homepage: {type: String},
  poster_path: { type: String },
  overview: { type: String },
  release_date: { type: String },
  original_title: { type: String },
  genres: [GenresSchema],
  original_language: { type: String },
  title: { type: String },
  backdrop_path: { type: String },
  popularity: { type: Number },
  vote_count: { type: Number },
  video: { type: Boolean },
  vote_average: { type: Number },
  production_countries: [{
    iso_3166_1: { type: String },
    name: { type: String }
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'}],
  runtime: { type: Number },
  spoken_languages: [{
    iso_639_1: { type: String },
    name: { type: String }
  }],
  status: { type: String },
  tagline: { type: String },
  certification: { type: String }
});

MovieSchema.statics.findByMovieDBId = id => {
  return this.findOne({ id: id });
};

MovieSchema.methods.addReview = function (reviewId) {
  console.log('pushing reviewId: ', reviewId);
    this.reviews.push(reviewId);
    return this.save(); //VERY IMPORTANT. MUST CALL SAVE() TO STORE IN DB.
};
export default mongoose.model('Movie', MovieSchema);