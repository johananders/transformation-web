
# Transformation Web
Transforms text input

* [Web](https://transformation-web.herokuapp.com/)

## Architecture

* React web app

## Deployment

### Local

#### Prerequisites

npm

#### Deploy

* install dependencies `npm install`
* `npm start` (assumes api running at http://localhost:8080)

### Production

#### Prerequisites

* Heroku account with app access
* heroku cli <https://devcenter.heroku.com/articles/heroku-cli>

#### Deploy

* Add heroku git remote ``
* Commit changes
* Push app (triggers deploy) `$ git push heroku master`
* More info <https://devcenter.heroku.com/categories/java>
* Logs can be viewed with `$ heroku logs`