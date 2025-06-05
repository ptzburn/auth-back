import User from '../models/user.model.js';

export const getUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).select('firstName lastName avatarUrl isVerified');

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
