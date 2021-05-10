import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

CastAndCrewSchema.statics.findByMovieDBId = id => {
    const model = mongoose.model('CastAndCrewModel');
    return model.findOne({ id: id });
};

export default mongoose.model('CastAndCrewModel', CastAndCrewSchema);