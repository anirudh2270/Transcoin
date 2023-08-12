const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../db.js');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authentication Failed!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const db_token = await db.query(
      `SELECT email FROM user_auth WHERE token = $1`,
      [token]
    );

    if (db_token.rows[0].email == decoded.data) {
      const time_left = (new Date(decoded.exp * 1000) - new Date()) / 60000;
      const total_time =
        (new Date(decoded.exp * 1000) - new Date(decoded.iat * 1000)) / 60000;

      const time_left_percentage = (time_left / total_time) * 100;
      if (time_left_percentage < process.env.JWT_EXP) {
        const token = jwt.sign(
          {
            data: decoded.data,
          },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_TIME }
        );

        await db.query(`UPDATE user_auth SET token = $1 WHERE email = $2`, [
          token,
          decoded.data,
        ]);

        return res.status(200).json({ refresh_token: token });
      }

      return next();
    }
  } catch (err) {
    console.log('Token verification error', err);

    const decoded = jwt.decode(token);

    await db.query(`UPDATE user_auth SET token = $1 WHERE email = $2`, [
      null,
      decoded.data,
    ]);

    res.status(401).json({ message: 'Unauthorized Access' });
  }
};

module.exports = verifyToken;
