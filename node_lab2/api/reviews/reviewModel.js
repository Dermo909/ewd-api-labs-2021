import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    author: { type: String },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'},
    content: { type: String },
    created_at: {type: Date},
    rating: { type: Number }
});

ReviewSchema.statics.findByMovieId = id => {
    return this.findOne({ movieId: id });
  };

export default mongoose.model('Review', ReviewSchema);