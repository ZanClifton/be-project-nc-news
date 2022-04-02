# ![Shrelly Mail Online](https://github.com/ZanClifton/be-project-nc-news/blob/main/shrelly-mail-online.jpeg)

[![Typing SVG](https://readme-typing-svg.herokuapp.com?duration=2000&color=3F9748&multiline=true&lines=Zan+Clifton+|+Shrelly+Mail+Online;A+RESTful+API)](https://git.io/typing-svg)

Designed to act as a backend news service, this API is intended to serve the data for a future frontend project, the culmination of which will be a fully functioning website.

Existing users are able to post articles on given topics, as well as to join discussions by commenting on them. A 'vote' feature is enabled for users to quickly respond to articles they liked or disliked. Further functionality is planned, including creating new users and topics, voting on comments, and more!

### [I've hosted it on Heroku; try it out now!](https://shrelly-mail-online.herokuapp.com/api)
[![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)](https://shrelly-mail-online.herokuapp.com/api)

<!-- ###### Take a look at [a list of all the endpoints you can currently try](https://github.com/ZanClifton/be-project-nc-news/blob/main/endpoints.json) on GitHub (which is much easier for the human eye to read) -->

## Creating A Local Copy

### ✔️ 1. CLONE THE REPO
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

Terminal Commands:
```
$ git clone https://github.com/ZanClifton/shrelly-mail-api.git
$ cd shrelly-mail-api
$ code .
```

### ✔️ 2. INSTALL DEPENDENCIES
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
```
$ npm install
```

### ✔️ 3. DOTENV
<img height=25 width=60 src="https://github.com/ZanClifton/shrelly-mail-api/blob/main/env.png">

In order for you to be able to run this project locally you will need to create 2 files in the main directory:
```
.env.development
.env.test
```

You can refer to the ``` .env-example ``` file to see how the files should look, however in each file you can copy and paste the relevant text below.


``` .env.development ``` should contain the following:
```
PGDATABASE=nc_news
```

and ``` .env.test ``` should contain the following:
```
PGDATABASE=nc_news_test
```

This will connect the databases. The ``` .gitignore ``` already has all ``` .env ``` files added to it for security reasons when pushing to GitHub.

### ✔️ 4. SEED THE LOCAL DATABASE
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

Run both of the following commands:
```
$ npm run setup-dbs
$ npm run seed
```

### ✔️ 5. RUN TESTS
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) 

Tests can be run with the following:
```
$ npm t
```
OR
```
$ npm test
```

### ✔️ 6. USAGE
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE)

Start the server listening with:
```
npm start
```
You can use a regular browser to make requests, or install a free framework for testing RESTful applications such as [Insomnia](https://insomnia.rest/download)


## Node.js and Postgres
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

This project was created using:
```
$ node -v | v17.7.1
$ psql -V | 12.9
```
The above commands will also enable you to check your own version in the terminal. It is recommended you update both packages to their most recent versions prior to working with this app.

# ![Shrelly Mail Online](https://github.com/ZanClifton/be-project-nc-news/blob/main/shrelly-mail-online.jpeg)

<div align=right>
  <h6> Project created with thanks to: <a href="https://northcoders.com/">Northcoders</a></h6>
  <h6>README.md created with thanks to: <a href="https://git.io/typing-svg">DenverCoder1</a> (ReadMe Typing SVG) | <a href="https://shields.io/">Shields IO</a> (Badges)</h6> 
</div>
