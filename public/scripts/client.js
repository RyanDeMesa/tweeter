const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
  <p>${escape(data.content.text)}</p>
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

const loadTweets = function () {
  $.get("/tweets", (tweets) => {
    renderTweets(tweets);
  });
};

const renderTweets = function (tweets) {
  $(".tweets-container").empty();

  for (const user of tweets) {
    const $tweet = createTweetElement(user);
    $(".tweets-container").prepend($tweet);
  }
};

$(document).ready(() => {
  $(".error").slideUp(0);

  $("#tweet-form").submit(function (event) {
    event.preventDefault();

    const maxCharacter = 140;
    const charLength = $(this).find("#tweet-text").val().length;

    if (charLength === 0) {
      $(".error").html(
        "<i class='fa-solid fa-triangle-exclamation'></i> &emsp;Oops! Say something! &emsp;<i class='fa-solid fa-triangle-exclamation'></i>"
      );
      $(".error").slideDown(400);
    } else if (charLength > maxCharacter) {
      $(".error").html(
        "<i class='fa-solid fa-triangle-exclamation'></i> &emsp;Oops! Too many characters! &emsp;<i class='fa-solid fa-triangle-exclamation'></i>"
      );
      $(".error").slideDown(400);
    } else {
      const serialized = $(this).serialize();

      $.post("/tweets", serialized).then(() => {
        loadTweets();
      });
      $(".error").slideUp(0);
      $("#tweet-text").val("");
      $(".counter").html(140);
    }
  });
  loadTweets();
});
