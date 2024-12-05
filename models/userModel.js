import { hash } from 'bcrypt';
import mongoose, { Schema, Types } from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  iplTeam: {
    type: String,
    required: [true, 'Please select your team!']
  },
  cart: [
    {
      product: {
        type: Types.ObjectId,
        ref: 'Product',
        required: true
      },
      count: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1']
      },
      name: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);

export default User;
