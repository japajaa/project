## Description

A Hobby project with MERN (MongoDB, Express, ReactJS, NodeJS) stack.

## Install

Clone repo.
cd client -> npm install
cd..
cd server -> npm install

setup a mongodb database.

in server set environment variables:
	-"PORT" (server will listen to this port, defaults to 4000 if not specified)
	-"MONGO_URI" (connection string for your mongodb database, for example: 'mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority')

in client set environment variable for api address "REACT_APP_API_URL" (for example: 'https://serveraddresshere.com')

## Run in Docker

TBD