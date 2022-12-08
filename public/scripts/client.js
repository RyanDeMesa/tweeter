/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];
//209349520815
//var one_day=1000*60*60*24;
const createTweetElement = (data) => {
  let $tweet = $(`
  <article>
  <header>
    <div class="left-side">
      <img class="image" src=${data.user.avatars}"></img>
      <a>${data.user.name}</a>
    </div>
    <a class="right-side">${data.user.handle}</a>
  </header>
  <p>${data.content.text}</p>
  <footer>
    <time class="left-side">${timeago.format(data.created_at)}</time>
    <div class="icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
  </article>`);
  return $tweet;
};

const renderTweets = (tweets) => {
  for (let index in tweets) {
    const render = createTweetElement(tweets[index])
  $('.tweets-container').prepend(render);
  console.log(render);
  }
}



$(document).ready(() => {renderTweets(data)})