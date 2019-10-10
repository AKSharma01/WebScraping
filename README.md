# WebScraping



[![Nodejs version](https://img.shields.io/badge/nodejs-10.16.3-blue.svg)](https://nodejs.org/en/blog/release/v10.16.3/) [![NPM](https://img.shields.io/badge/npm-6.11.3-skyblue.svg)](https://www.npmjs.com/package/npm/v/6.11.3) [![EXPRESS](https://img.shields.io/badge/express-4.17.1-green.svg)]([https://expressjs.com/en/4x/api.html](https://expressjs.com/en/4x/api.html))[ ![SEQUELIZE](https://img.shields.io/badge/sequelizer-5.19.3-silver.svg)]([https://www.npmjs.com/package/sequelize](https://www.npmjs.com/package/sequelize))

Purpose of the project is to search all the url in webpage and store into database

__Table of content__
    
- [Install](#install)
- [Local WorkSpace](#local-workspace)
- [Authors](#authors)
- [Contributions](#contributions)


# Install
> Pre-requirement
**node.js**, **express.js**, **sequelize**

#### Install The Node.Js And NMP Packages On Ubuntu 16.04 / 18.04 LTS
```sh
>>> sudo curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
>>> sudo bash nodesource_setup.sh
>>> sudo apt-get install nodejs
>>> nodejs -v
v10.16.3
```
#### Install latest version of NPM
```sh
>>> npm install -g npm@6.11.3
>>> npm -v
6.11.3
```

## Local WorkSpace
 ```sh
 >>> git clone https://github.com/AKSharma01/WebScraping.git
 >>> cd WebScraping
 >>> yarn install (to install project dependencies)
 >>> convert env file to .env
 >>> node .
Web server listening at: http://localhost:5000
 ```

## API EndPoinst
 ```sh
 1) (post method) http://localhost:5000/apis/v1/scraping/  
 2) (get method) http://localhost:5000/apis/v1/scraping?page=0&limit=30&search=png
    (filter and pagination)
 3) (get method) http://localhost:5000/apis/v1/scraping/:id
    (find by id)
 >> (Postman link) https://www.getpostman.com/collections/d7e8f30a8289fa60bf64
 ```

 
 # Authors
 - Akash Kumar Sharma ([github.com/AKSharma01](https://github.com/AKSharma01))
 
