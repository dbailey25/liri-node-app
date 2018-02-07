require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
// console.log(keys.omdb.api_key);

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var section = '========================================================';
var args = process.argv;

function showTimeline(tweet) {
  console.log(tweet.created_at + ': ' + tweet.text);
}

var command = process.argv[2];

if ( command === 'my-tweets' ) {
  var params = {screen_name: 'baileydomain', count: 20};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(section);
      console.log('Tweets by @' + params.screen_name + '\n');
      tweets.forEach(showTimeline)
  }
});
}

else if (command === 'spotify-this-song') {
  var songName = 'the sign';
  // var artist = 'ace of base';
  if (args.length > 3) {
    songName = process.argv[3];
    // artist = '';
  };

    spotify.search({ type: 'track', query: songName, limit: 1}, function(err, data) {
      if ( err ) {
        console.log('Error occurred: ' + err);
        return;
      }
    console.log(section);
    console.log('Details for ' + songName + ': \n');
    console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
    console.log('Track: ' + data.tracks.items[0].name);
    console.log('Preview: '+ data.tracks.items[0].external_urls.spotify);
    console.log('Album: ' + data.tracks.items[0].album.name);
});
}

else if (command === 'movie-this') {
  var movieName = 'Mr. Nobody';
  var title = '';
  var year = 0;
  var imdbRating = 0;
  var tomatoRating = 0;
  var country = '';
  var language = '';
  var plot = '';
  var actors = '';

  function displayDetails() {
    console.log(section);
    console.log('Details for ' + title + ': \n');
    console.log('Year: ' + year)
    console.log('imdb Rating: ' + imdbRating);
    console.log('Rotten Tomatoes Rating: ' + tomatoRating);
    console.log('Country: ' + country);
    console.log('Language: ' + language);
    console.log('Plot: ' + plot);
    console.log('Actors: ' + actors);
  }

  if (args.length > 3) {
    movieName = process.argv[3];
  };
  request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=' + keys.omdb.api_key, function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and save the required data
    // console.log(JSON.parse(body));
    title = JSON.parse(body).Title;
    year = JSON.parse(body).Year;
    imdbRating = JSON.parse(body).imdbRating;
    tomatoRating = JSON.parse(body).Ratings[1].Value;
    country = JSON.parse(body).Country;
    language = JSON.parse(body).Language;
    plot = JSON.parse(body).Plot;
    actors = JSON.parse(body).Actors;
    displayDetails()
  }
});
}
