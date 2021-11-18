/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/


//To show the time fxn
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
  //this is to load tweets on the page
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      type: 'GET',
      dataType: 'json',
      success: function(tweetData) {
        renderTweets(tweetData);
      }
    })
  }

  //safe text
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const form = $(".new-tweet form")
  form.on('submit', (event) => {
    event.preventDefault();
    
    
    $('button').click(function() {
      let tweetText = $('textarea').val().replace(/^\s+|\s+$/g, '');

      if (tweetText.length > 140) {
        $("#blank").hide();
        $(".error").show();
        $("#long").show();
      } else if (tweetText === "") {
        $("#long").hide();
        $(".error").show();
        $("#blank").show();
      } else {
        //this is to submit new tweet
        $.ajax({
          type: "POST",
          url: '/tweets',
          data: form.serialize(),
          success: function() {
            $("#blank").hide();
            $(".error").hide();
            $('textarea').val('');
            $(".counter").text("140");
            loadTweets();
          }
        })
        
        
      }
    })
  })
  
  const renderTweets = function(tweets) {
    $('#main-container').empty();
    for (let tweetObj of tweets) {
      const tweetElement = createTweetElement(tweetObj);
      $('#main-container').prepend(tweetElement);
    }
  }

  const createTweetElement = (data) => {
    let time = timeago.format(data.created_at, 'tweetTime');
    const tweetElement = `<article class="tweet">
    <header>
    <img src=${data.user.avatars} />
    <h3 class="user">${data.user.name}</h3>
    <h3 class="handle">${data.user.handle}</h3>
    
    </header>
    <p class="tweetBody">${escape(data.content.text)}</p>
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

  loadTweets()
  //if i remove this, the tweets disappear everytime i refresh
});


