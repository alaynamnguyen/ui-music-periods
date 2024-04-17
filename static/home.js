$(document).ready(function () {
  $("#startButton").click(function () {
    event.preventDefault();
    window.location.href = "/learn/1";
  });
  $("#quizButton").click(function () {
    event.preventDefault();
    window.location.href = "/restart_quiz";
  });
});
