require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
// console.log(keys);

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var section = '========================================================';

function showTimeline(tweet) {
  console.log(tweet.created_at + ': ' + tweet.text + '\n');
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

spotify.search({ type: 'track', query: 'taxman' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

    console.log(data);
});
}
//

//
//
