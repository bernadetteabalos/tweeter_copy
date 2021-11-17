/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const locale = function(number, index, totalSec) {
  // number: the time ago / time in number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  return [
    ['just now', 'right now'],
    ['%s seconds ago', 'in %s seconds'],
    ['1 minute ago', 'in 1 minute'],
    ['%s minutes ago', 'in %s minutes'],
    ['1 hour ago', 'in 1 hour'],
    ['%s hours ago', 'in %s hours'],
    ['1 day ago', 'in 1 day'],
    ['%s days ago', 'in %s days'],
    ['1 week ago', 'in 1 week'],
    ['%s weeks ago', 'in %s weeks'],
    ['1 month ago', 'in 1 month'],
    ['%s months ago', 'in %s months'],
    ['1 year ago', 'in 1 year'],
    ['%s years ago', 'in %s years']
  ][index];
};

timeago.register('tweetTime', locale);

$(function() {
  const form = $(".new-tweet form")
  form.on('submit', (event) => {
    event.preventDefault();

    $.ajax({
      type: "POST",
      url: form.attr('action'),
      data: form.serialize(),
      success: function() {
        
      }
    })

  })
  
  const renderTweets = function(tweets) {
    for (let tweetObj of tweets) {
      const tweetElement = createTweetElement(tweetObj);
      $('#main-container').append(tweetElement);
    }
  }

  const createTweetElement = (data) => {
    let time = timeago.format(data.created_at, 'tweetTime');
    const tweetElement = `<article class="tweet">
    <header>
    <h3 class="user">${data.user.name}</h3>
    <h3 class="handle">${data.user.handle}</h3>
    
    </header>
    <p class="tweetBody">${data.content.text}</p>
    <footer>
    <p class="date">
    ${time}
    </p>
    <div class="icons">
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
    </div>
    </footer>
    </article>`;
    
    return tweetElement;
  }
  
  renderTweets(tweetData);
  
});


