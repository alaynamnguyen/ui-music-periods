$(document).ready(function () {
  let currentQuestion = 0;
  const questions = [
    // Questions and answers will be populated here
  ];

  function displayQuestion() {
    $("#quiz-question-title").text(questions[currentQuestion].question);
    $(".quiz-option button").each(function (index) {
      $(this).text(questions[currentQuestion].options[index]);
    });
  }

  $(".quiz-option button").click(function () {
    const selectedAnswer = $(this).parent().data("answer");
    if (selectedAnswer === questions[currentQuestion].correct) {
      alert("Correct!");
    } else {
      alert("Incorrect!");
    }
  });

  $("#next-question").click(function () {
    currentQuestion = (currentQuestion + 1) % questions.length;
    displayQuestion();
  });

  displayQuestion();
});
