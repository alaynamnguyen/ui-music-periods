$(document).ready(function () {
  const totalQuestions = data.total_questions;
  const currentId = data.current_id;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  function sendAnswerData(questionId, selectedAnswer, isCorrect) {
    $.ajax({
      url: "/update_score",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        questionId: questionId,
        selectedAnswer: selectedAnswer,
        correct: isCorrect,
      }),
      success: function (response) {
        console.log("Score updated", response);
      },
      error: function (xhr, status, error) {
        console.log("Error updating score:", status);
      },
    });
  }

  function displayOptions() {
    let options = [data.correct, data.incorrect];
    shuffleArray(options);

    $("#options-container").empty();

    options.forEach(function (option) {
      let button = $("<button>")
        .addClass("btn btn-outline-primary btn-block quiz-option")
        .text(option)
        .attr("data-answer", option)
        .click(function () {
          $(".quiz-option").prop("disabled", true);
          const selectedAnswer = $(this).data("answer");
          const correctAnswer = data.correct;
          const isCorrect = selectedAnswer === correctAnswer;
          if (isCorrect) {
            $(this).removeClass("btn-outline-primary").addClass("btn-success");
          } else {
            $(this).removeClass("btn-outline-primary").addClass("btn-danger");
            $(".quiz-option").each(function () {
              if ($(this).data("answer") === correctAnswer) {
                $(this)
                  .removeClass("btn-outline-primary")
                  .addClass("btn-success");
              }
            });
          }
          displayFeedback(isCorrect);
          updateNextButton(true);
          sendAnswerData(data.current_id, selectedAnswer, isCorrect);
        });
      $("#options-container").append(button);
    });
  }

  function displayFeedback(isCorrect) {
    var feedbackText = isCorrect
      ? "Correct! Well done."
      : "Incorrect. Better luck next time!";
    $("#feedback-message").text(feedbackText);
  }

  function updateNextButton(answered) {
    let nextUrl =
      currentId >= totalQuestions ? "/quiz_end" : `/quiz/${currentId + 1}`;
    $("#next-button")
      .text(answered ? "Next Question" : "Skip")
      .off("click")
      .click(function () {
        window.location.href = nextUrl;
      });
  }

  // Initialize Next/Skip button in its own div
  $("#navigation-button").append(
    $("<button>").attr("id", "next-button").addClass("btn btn-secondary mt-3")
  );

  updateNextButton(false); // Initially set to "Skip" as no answer has been selected yet

  displayOptions();
});
