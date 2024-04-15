function displayContent(data, id) {
    //insert data for this page
    let content = data[id];
    $("#learn-title").text(content["title"] + " Period");

    const audioContainer = $("#audioFiles");
    audioContainer.empty();
    content.audio.forEach((audioUrl) => {
        let audioElement = $("<audio>").attr("controls", true);

        let sourceElement = $("<source>")
            .attr("src", audioUrl)
            .attr("type", "audio/wav");

        audioElement.append(sourceElement);
        let audioDiv = $("<div>")
            .addClass("audio-wrapper")
            .append(audioElement);
        audioContainer.append(audioDiv);
    });

    $("#learn-next").click(function () {
        event.preventDefault();
        window.location.href = content["next"];
    });
}

$(document).ready(function () {
    displayContent(data, id);
});
