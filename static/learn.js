function displayAudioContent(content, i) {
    const audioContainer = $("#audioFiles");
    audioContainer.empty();
    let audios = content["audio"];
    let audioTitles = content["audioTitles"];
    let audioDescriptions = content["audioDescriptions"];

    let audioUrl = audios[i];
    let audioElement = $("<audio>").attr("controls", true);

    let sourceElement = $("<source>")
        .attr("src", audioUrl)
        .attr("type", "audio/wav");

    audioElement.append(sourceElement);

    let fullText = audioDescriptions[i];
    let titleText = audioTitles[i];

    let textBox = $("<div>").addClass("learn-text").text(fullText);
    let titleBox = $("<div>").addClass("learn-title").text(titleText);

    let audioDiv = $("<div>")
        .addClass("audio-wrapper")
        .append(audioElement)
        .append(textBox)
        .append(titleBox);

    audioContainer.append(audioDiv);
}

function displayContent(data, id) {
    const limitAudioLength = 4;
    let content = data[id];
    let audios = content["audio"];
    $("#learn-title").text(content["title"] + " Period");
    $("#learn-img").attr("src", content["image"]);
    displayAudioContent(content, 0); // display first audio

    for (let i = 0; i < limitAudioLength; i++) {
        let audioButton = $("<button>")
            .addClass("learn-button")
            .text("Audio " + (i + 1))
            .attr("data-index", i)
            .click(function () {
                displayAudioContent(content, i);
                $(".learn-button").removeClass("active");
                $(this).addClass("active");
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
    add_interation({ timestamp: now, pageUrl: "/learn/" + id });

    displayContent(data, id);
    $(".learn-button[data-index='0']").click();
});
