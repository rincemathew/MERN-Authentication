import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    //he timestamps option is used to automatically add createdAt and updatedAt fields to your schema. This feature is particularly useful for tracking the creation and update times of documents.
// {
//   _id: 60c72b2f5f4b5a3c4c8e8b9e,
//   name: 'John Doe',
//   email: 'john.doe@example.com',
//   createdAt: 2024-07-26T12:34:56.789Z,
//   updatedAt: 2024-07-26T12:34:56.789Z,
//   __v: 0
// }

    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;