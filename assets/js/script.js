// Select all required tags or elements
const wrapper = document.querySelector('.wrapper'),
    musicImg = wrapper.querySelector('.img-area img'),
    musicName = wrapper.querySelector('.song-details .name'),
    musicArtist = wrapper.querySelector('.song-details .artist'),
    mainAudio = wrapper.querySelector('#main-audio'),
    playPauseBtn = wrapper.querySelector('.play-pause'),
    prevBtn = wrapper.querySelector('#prev'),
    nextBtn = wrapper.querySelector('#next'),
    progressBar = wrapper.querySelector('.progress-bar');

let musicIndex = 1;

window.addEventListener("load", () => {
    loadMusic(musicIndex); // Calling load music function once window
});

// Load music function
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `../assets/images/${allMusic[indexNumb - 1].img}`;
    mainAudio.src = `../assets/songs/${allMusic[indexNumb - 1].src}`;
};

// Play music function
function playMusic() {
    wrapper.classList.add('paused');
    playPauseBtn.querySelector('i').innerText = 'pause';
    mainAudio.play();
};

// Play music function
function pauseMusic() {
    wrapper.classList.remove('paused');
    playPauseBtn.querySelector('i').innerText = 'play_arrow';
    mainAudio.pause();
};

// Next music function
function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
};

// Prev music function
function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
};

// Play or music button event
playPauseBtn.addEventListener('click', () => {
    const isMusicPaused = wrapper.classList.contains('paused');
    // If isMusicPaused is true them call pauseMusic else call playMusic
    isMusicPaused ? pauseMusic() : playMusic();
});

// Next music btn event
nextBtn.addEventListener('click', () => {
    nextMusic();
});

// Prev music btn event
prevBtn.addEventListener('click', () => {
    prevMusic();
});

// Update progress bar width according to music current time
mainAudio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    
    progressBar.style.width = `${progressWidth}%`;

    let musicMusicCurrentTime = wrapper.querySelector('.current-time'),
        musicDuration = wrapper.querySelector('.max-duration');
    
    mainAudio.addEventListener('loadeddata', () => {
        // Update song total duration
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);

        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }

        musicDuration.innerText = `${totalMin}:${totalSec}`;
    })

    // Update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);

    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    
    musicMusicCurrentTime.innerText = `${currentMin}:${currentSec}`;
})