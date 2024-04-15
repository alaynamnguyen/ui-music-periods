function displayContent(data, id) {
    //insert data for this page
    let content = data[id];
    $("#learn-title").text(content["title"] + " Period");

    const audioContainer = $("#audioFiles");
    audioContainer.empty();
    let audios = content["audio"];
    for (let i = 0; i < audios.length; i++) {
        let audioUrl = audios[i];
        let audioElement = $("<audio>").attr("controls", true);

        let sourceElement = $("<source>")
            .attr("src", audioUrl)
            .attr("type", "audio/wav");

        audioElement.append(sourceElement);

        let fullText =
            i +
            " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

        let textBox = $("<div>")
            .addClass("hover-text")
            .text("Hover for info")
            .data("full-text", fullText);

        let audioDiv = $("<div>")
            .addClass("audio-wrapper")
            .append(audioElement)
            .append(textBox);

        audioContainer.append(audioDiv);
    }

    $(".audio-wrapper").hover(
        function () {
            $(this)
                .find(".hover-text")
                .text($(this).find(".hover-text").data("full-text"));
        },
        function () {
            $(this).find(".hover-text").text("Hover for info");
        }
    );

    $("#learn-next").click(function () {
        event.preventDefault();
        window.location.href = content["next"];
    });
}

$(document).ready(function () {
    displayContent(data, id);
});
