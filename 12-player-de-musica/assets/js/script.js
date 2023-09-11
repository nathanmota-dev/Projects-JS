const player = document.getElementById('player');
const musicName = document.getElementById('musicName');
const playPauseButton = document.getElementById('playPauseButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');

import songs from "./songs.js";

const textButtonPlay = "<i class 'bx bx-caret right'></i>"; //botão play
const textButtonPause = "<i class 'bx bx-pause'></i>"; //botão pause

let index = 0; //index musica atual

prevButton.onclick = () => prevNextMusic("prev");
nextButton.onclick = () => prevNextMusic();

playPauseButton.onclick = () => playPause();

const playPause = () => {

    if (player.paused) {
        player.play();
        playPauseButton.innerHTML = textButtonPause;
    } else {
        player.pause();
        playPauseButton.innerHTML = textButtonPlay;
    }
};

player.ontimeupdate = () => updateTime();

const updateTime = () => {

    const currentMinutes = Math.floor(player.currentTime / 60);
    const currentSeconds = Math.floor(player.currentTime % 60);
    currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);

    //const durantion

};

const formatZero = (n) => (n < 10 ? "0" + n : n);

const prevNextMusic = (type = "next") => {

    if ((type === "next" && index + 1 === songs.length) || type === "init") {
        index = 0;
    } else if (type === "prev" && index === 0) {

    } else {
        index = type === index ? index - 1 : index + 1;
    }

    player.src = songs[index].src;
    musicName.innerHTML = songs[index].name;

    if (type != "init") playPause();

    updateTime();
};

prevNextMusic("init");