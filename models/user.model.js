import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minLength: [2, 'First name is too short'],
      maxLength: [20, 'First name is too long'],
      match: [/^[a-zA-Z]+$/, 'First name must contain only letters']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minLength: [2, 'Last name is too short'],
      maxLength: [20, 'Last name is too long'],
      match: [/^[a-zA-Z]+$/, 'Last name must contain only letters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      maxLength: [50, 'Email is too long'],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please fill a valid email address'
      ]
    },
    hashedPassword: {
      type: String,
      required: [true, 'Password is required']
    },
    avatarUrl: {
      type: String,
      default: ''
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verifyOtp: {
      type: String,
      default: ''
    },
    verifyOtpExpiresAt: {
      type: Number,
      default: 0
    },
    resetOtp: {
      type: String,
      default: ''
    },
    resetOtpExpiresAt: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.hashedPassword;
  }
});

const User = mongoose.model('User', userSchema);

export default User;
