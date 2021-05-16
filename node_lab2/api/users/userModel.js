import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

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

// NEW:A static funtion to find by username
UserSchema.statics.findByUserName = function (username) {
    return this.findOne({ username: username });
};

// NEW:A instance funtion to add a favourite movie.
UserSchema.methods.addFavourite = function (movieId) {
    this.favourites.push(movieId);
    return this.save(); //VERY IMPORTANT. MUST CALL SAVE() TO STORE IN DB.
};

UserSchema.methods.addWatchlist = function (movieId) {
    this.watchlist.push(movieId);
    return this.save(); 
};

UserSchema.methods.comparePassword = function (passw, callback) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

UserSchema.pre('save', function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) {
                return next(err);
            }
            console.log(hash);
            user.password = hash;
            next();
        });
    }
    else {
        return next();
    }
});
export default mongoose.model('User', UserSchema);