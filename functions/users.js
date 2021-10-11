const { DynamoDB } = require('aws-sdk');
const sls = require('serverless-http');
const express = require('express');
const userSchema = require('./schemas/user');
const validateRequest = require('./middlewares/validateRequest');

const db = new DynamoDB.DocumentClient();
const UsersTable = process.env.USERS_TABLE;

const usersAPI = express();
usersAPI.use(express.json());

usersAPI.post(
  '/user',
  validateRequest(userSchema, 'body'),
  async (req, res, next) => {
    const user = {
      username: req.body.username,
      email: req.body.email,
      role_name: req.body.role_name,
    };
    console.log('user object: ', user);
    try {
      const dbResult = await db
        .put({
          TableName: UsersTable,
          Item: user,
        })
        .promise();
      console.log('successfully created user');
      console.log(dbResult);
      return res.status(201).send(user);
    } catch (err) {
      console.log('error in saving user');
      console.log(err);
      return res.status(500).send(err);
    }
  }
);

usersAPI.get('/user/:username', async (req, res, next) => {
  try {
    const dbResult = await db
      .get({
        TableName: UsersTable,
        Key: {
          username: req.params.username,
        },
      })
      .promise();
    console.log('successfully found user');
    console.log(dbResult);
    return res.status(200).send(dbResult.Item);
  } catch (err) {
    console.log('error in getting user');
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports.handler = sls(usersAPI);
