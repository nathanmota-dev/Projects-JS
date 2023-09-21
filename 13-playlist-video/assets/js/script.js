import videos from "./videos.js"; // Importe os vídeos corretamente do módulo "videos.js"

function loadVideos() {
    const playlist_area = document.querySelector(".playlist");

    videos.forEach((video, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
        <div class="playlist-video ${index + 1 === 1 ? 'active' : ''}">
            <video src="${video.src}" muted></video>
            <label class="playlist-video-info">${video.title}</label>
        </div>
        `;

        playlist_area.appendChild(div);
    });

    addOnClick();
}

function addOnClick() {
    const video_main = document.querySelector(".main-video-content");
    const playlist_videos = document.querySelectorAll(".playlist-video"); // Selecione todos os elementos com a classe "playlist-video"

    playlist_videos.forEach((item, i) => {
        if (!i) {
            setVideo(video_main, item);
        }

        item.onclick = () => {
            playlist_videos.forEach((video) => video.classList.remove("active"));
            item.classList.add("active");

            setVideo(video_main, item);
        };
    });
}

function setVideo(video_main, item) {
    video_main.children[0].src = item.querySelector("video").getAttribute("src"); // Corrija a obtenção do atributo "src"
    video_main.children[1].innerHTML = item.querySelector(".playlist-video-info").innerHTML;
}

loadVideos();
