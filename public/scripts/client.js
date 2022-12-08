$(document).ready(() => {

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

  const renderTweets = (tweets) => {
    for (let index in tweets) {
      const render = createTweetElement(tweets[index]);
      $(".tweets-container").prepend(render);
      console.log(render);
    }
  };

  const loadTweets = () => {
    $.ajax("/tweets", { method: "GET" }).then(function (tweets) {
      renderTweets(tweets);
      console.log("Success: ", tweets);
    });
  };

  loadTweets();

  $("#tweet-form").submit(function (event) {
    event.preventDefault();
    const maxCharacter = 140;
    const charLength = $(this).find("#tweet-text").val().length;

    if (charLength === 0) {
      return alert("Oops! Your tweet is empty!");
    } else if (charLength > maxCharacter) {
      return alert("Oops too many characters, please remove some!");
    } else {
      let serialized = $(this).serialize();
      console.log(serialized);
      $.post("/tweets", serialized);
      loadTweets();
    }
  });
});
