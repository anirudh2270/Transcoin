const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const yup = require('yup');

exports.login = async (req, res) => {
  const login_schema = yup.object({
    Email: yup.string().email().required(),
    Password: yup
      .string()
      .required()
      .min(8, 'Password Must be 8 characters or more')
      .matches(/[a-z]+/, 'Password must have One lowercase character')
      .matches(/[A-Z]+/, 'Password must have One uppercase character')
      .matches(/[@$!%*#?&]+/, 'Password must have One special character')
      .matches(/\d+/, 'Password must have One number'),
  });

  try {
    await login_schema.validate(req.body.data);
  } catch (error) {
    return res.status(400).json({
      message: error.errors,
    });
  }
  const email = req.body.data.Email;

  const password = req.body.data.Password;

  try {
    const data = await db.query(`SELECT * FROM user_auth WHERE email = $1`, [
      email,
    ]);
    if (data.rows.length == 0) {
      return res.status(400).send({
        message: 'Email not found!',
      });
    } else {
      bcrypt.compare(
        password,
        data.rows[0].password,
        async function (err, result) {
          if (err) throw err;
          if (result == true) {
            const token = jwt.sign(
              {
                data: email,
              },
              process.env.JWT_SECRET,
              { expiresIn: process.env.JWT_TIME }
            );
            await db.query(`UPDATE user_auth SET token = $1 WHERE email = $2`, [
              token,
              email,
            ]);
            return res.status(200).json({ token, email });
          } else {
            return res.status(400).json({
              message: 'Password is incorrect!',
            });
          }
        }
      );
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Oops! Something went wrong,Please try again later!',
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const signup_schema = yup.object({
      Email: yup.string().email().required(),
      Password: yup
        .string()
        .required()
        .min(8, 'Password Must be 8 characters or more')
        .matches(/[a-z]+/, 'Password must have One lowercase character')
        .matches(/[A-Z]+/, 'Password must have One uppercase character')
        .matches(/[@$!%*#?&]+/, 'Password must have One special character')
        .matches(/\d+/, 'Password must have One number'),
      Username: yup.string().required(),
    });

    try {
      await signup_schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({
        message: error.errors,
      });
    }

    const email = req.body.Email;
    const password = req.body.Password;
    const username = req.body.Username;

    const db_email = await db.query(
      'SELECT email FROM user_auth WHERE email = $1',
      [email]
    );

    if (db_email.rows.length) {
      return res.status(409).json({
        message: 'Email already exists!',
      });
    }

    bcrypt.hash(password, 10).then(async function (hash) {
      await db.query(
        'INSERT INTO user_auth (email,password,username) VALUES ($1,$2,$3)',
        [email, hash, username]
      );
      return res.status(200).json({
        message: 'User created successfully!',
      });
    });
  } catch (error) {
    res.status(500).json({
      message: 'Oops! Something went wrong,Please try again later!',
    });
  }
};

exports.logout = async (req, res) => {
  const token = req.body.token || req.headers.authorization || req.query.token;

  if (!token) {
    return res.status(401).json({ message: 'Authentication Failed!' });
  }

  try {
    const decoded_token = jwt.decode(token);
    await db.query(`UPDATE user_auth SET token = $1 WHERE email = $2`, [
      null,
      decoded_token.data,
    ]);
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Oops! Something went wrong,Please try again later!',
    });
  }
};
