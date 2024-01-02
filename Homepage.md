# Sneakfeed

Sneakfeed is a social media application like Twitter that I made to learn new technologies.

https://sneakfeed.vercel.app/

In order to see a feed, please register and login.

## Technologies

In this website, we can seperate into Frontend and Backend.

Frontend - I decided to use modern framework like React JS here along with MUI.

For deployment on Frontend, I use Vercel because it is easy to deploy as I can use Vercel's pipeline without config a lot of things.

Backend - I used Gin, Go Framework.

For DB, I decided to use MongoDB because I want to make it fast which I don't need to work with schema like Relational Database does. Moreover, I can use Cloud Version so I don't need to deploy by my own.

For deployment on Backend, I use Cloudrun and Google Artifact Registry using Github Action to do CI/CD.

For more, please see below.

- Frontend - https://github.com/tipbk/sneakfeed-client
- Backend - https://github.com/tipbk/sneakfeed-service

## Features

- Access token and refresh token automatically renew on Frontend
- Able to get OG Meta for posting
- Able to place image from clipboard using Ctrl/Cmd + V
- Can like, comment, follow, unfollow like Twitter (X)
- Have 3 types of feeds. Global feed to see all posts, following feed to see posts of person you followed, your feed to see your posts.
- Have a cat dancing at the end of this page along with music :)
- And more!
