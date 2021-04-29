import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GenresSchema = new Schema({
  id: { type: Number },
  Name: { type: String }
});

export default mongoose.model('genre', GenresSchema);