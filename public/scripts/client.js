$(document).ready(() => {
  
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

const loadTweets = () => {
  $.ajax("/tweets", { method: "GET" }).then(function (tweets) {
    renderTweets(tweets)
    console.log("Success: ", tweets);
  });
};

loadTweets();

$("#tweet-form").submit(function(event) {
  event.preventDefault();
  const serialized = $(this).serialize();
  console.log(serialized);
  $.post("/tweets", serialized);
});


})

