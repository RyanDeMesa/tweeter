$(document).ready(function () {
  $("#tweet-text").on("keyup", function () {
    const counter = $(".counter");
    const characterCount = 140 - this.value.length;

    counter.html(characterCount);

    if (characterCount < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#545149");
    }
  });
});
