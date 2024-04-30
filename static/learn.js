function displayAudioContent(content, i) {
    const audioContainer = $("#audioFiles");
    audioContainer.empty();
    let audios = content["audio"];

    let audioUrl = audios[i];
    let audioElement = $("<audio>").attr("controls", true);

    let sourceElement = $("<source>")
        .attr("src", audioUrl)
        .attr("type", "audio/wav");

    audioElement.append(sourceElement);

    // TODO: update text and title and image to the data
    let fullText =
        i +
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    let titleText = "Title: todo update when data is ready";

    let textBox = $("<div>").addClass("learn-text").text(fullText);
    let titleBox = $("<div>").addClass("learn-title").text(titleText);

    let audioDiv = $("<div>")
        .addClass("audio-wrapper")
        .append(audioElement)
        .append(textBox)
        .append(titleBox);

    audioContainer.append(audioDiv);

    // $("#learn-img").src(
    //     "https://tarangkd2113.github.io/ui-project-resources/home_page_learning.jpg"
    // );
}

function displayContent(data, id) {
    //insert data for this page
    let content = data[id];
    let audios = content["audio"];
    $("#learn-title").text(content["title"] + " Period");
    displayAudioContent(content, 0);

    for (let i = 0; i < audios.length; i++) {
        let audioButton = $("<button>")
            .addClass("learn-button")
            .text("Audio " + (i + 1))
            .attr("data-index", i)
            .click(function () {
                displayAudioContent(content, i);
            });

        $("#learn-buttons").append(audioButton);
    }

    $("#learn-next").click(function () {
        event.preventDefault();
        window.location.href = content["next"];
    });
}

$(document).ready(function () {
    function add_interation(now) {
        $.ajax({
            type: "POST",
            url: "/add_learn_interaction",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(now),
            success: function (result) {
                let newLen = result["length"];
                // console.log("Recorded learn interaction #" + newLen);
            },
            error: function (request, status, error) {
                console.log("Error");
                console.log(request);
                console.log(status);
                console.log(error);
            },
        });
    }
    let now = new Date();
    add_interation({ timestamp: now, pageUrl: "/learn/1" });

    displayContent(data, id);
});
