$(document).ready(function () {
    $("#startButton").click(function () {
        event.preventDefault();
        window.location.href = "/learn/1";
    });
    $("#quizButton").click(function () {
        event.preventDefault();
        window.location.href = "/restart_quiz";
    });
    $("#medieval").click(function () {
        window.location.href = "/learn/1";
    });
    $("#baroque").click(function () {
        window.location.href = "/learn/3";
    });
    $("#romantic").click(function () {
        window.location.href = "/learn/5";
    });
    $("#renaissance").click(function () {
        window.location.href = "/learn/2";
    });
    $("#classical").click(function () {
        window.location.href = "/learn/4";
    });
    $("#century").click(function () {
        window.location.href = "/learn/6";
    });
});
