const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, trim: true, required: true },
  name: { type: String, trim: true },
  email: { type: String, unique: true, trim: true, required: true },
  passwordHash: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female'] },
  image: { type: String, trim: true },
  location: { type: String, required: true },
  postcode: { type: String, required: true },
  locationCoords: { lat: { type: Number }, lng: { type: Number } },
  about: { type: String },
  groups: [{ type: mongoose.Schema.ObjectId, ref: 'Group'}]
}, {
  timestamps: true
});

userSchema
.virtual('password')
.set(setPassword);

userSchema
.virtual('passwordConfirmation')
.set(setPasswordConfirmation);

userSchema
.path('passwordHash')
.validate(validatePasswordHash);

userSchema
.path('email')
.validate(validateEmail);

userSchema.methods.validatePassword = validatePassword;

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.passwordHash;
    // delete ret.email;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);

function setPassword(value) {
  this._password    = value;
  this.passwordHash = bcrypt.hashSync(value, bcrypt.genSaltSync(8));
}

function setPasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
}

function validatePasswordHash() {
  if (this.isNew) {
    if(!this._password) {
      return this.invalidate('password', 'A password is required');
    }

    if (this._password.length < 6) {
      this.invalidate('password', 'must be at least six characters');
    }

    if (this._password !== this._passwordConfirmation) {
      return this.invalidate('passwordConfirmation', 'Passwords do not match.');
    }
  }
}

function validateEmail(email) {
  if (!validator.isEmail(email)) {
    return this.invalidate('email', 'must be a valid email address');
  }
}

function validatePassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
}
