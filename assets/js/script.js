// Select all required tags or elements
const wrapper = document.querySelector('.wrapper'),
    musicImg = wrapper.querySelector('.img-area img'),
    musicName = wrapper.querySelector('.song-details .name'),
    musicArtist = wrapper.querySelector('.song-details .artist'),
    mainAudio = wrapper.querySelector('#main-audio'),
    playPauseBtn = wrapper.querySelector('.play-pause'),
    prevBtn = wrapper.querySelector('#prev'),
    nextBtn = wrapper.querySelector('#next'),
    progressArea = wrapper.querySelector('.progress-area'),
    progressBar = wrapper.querySelector('.progress-bar'),
    repeatBtn = wrapper.querySelector('#repeat-plist'),
    musicList = wrapper.querySelector('.music-list'),
    showMoreBtn = wrapper.querySelector('#more-music'),
    hideMusicBtn = musicList.querySelector('#close');

let musicIndex = 1;

window.addEventListener("load", () => {
    loadMusic(musicIndex); // Calling load music function once window
});

// Load music function
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `../assets/images/${allMusic[indexNumb - 1].img}`;
    mainAudio.src = `../assets/songs/${allMusic[indexNumb - 1].src}.mp3`;
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
});

// Update playing song curent time according to the progress bar width
progressArea.addEventListener('click', (e) => {
    let progressWidthval = progressArea.clientWidth; // Get width of progress bar
    let clickedOffSetX = e.offsetX; // Get offset x value
    let songDuration = mainAudio.duration; // Get song total duration

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic();
});

// Let's work on repeat, shuffle song according to the icon
repeatBtn.addEventListener('click', () => {
    let getText = repeatBtn.innerText; // Get innerText of icon

    switch (getText) {
        case 'repeat':
            repeatBtn.innerText = 'repeat_one';
            repeatBtn.setAttribute('title', 'Song looped');
            break;
        case 'repeat_one':
            repeatBtn.innerText = 'shuffle';
            repeatBtn.setAttribute('title', 'Playback shuffle');
            break;
        case 'shuffle':
            repeatBtn.innerText = 'repeat';
            repeatBtn.setAttribute('title', 'Playlist looped');
            break;
    }
});

// After song ended
mainAudio.addEventListener('ended', () => {
    let getText = repeatBtn.innerText; // Get innerText of icon

    switch (getText) {
        case 'repeat':
            nextMusic();
            break;
        case 'repeat_one':
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case 'shuffle':
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);

            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } while (musicIndex == randIndex);

            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            break;
    }
});

showMoreBtn.addEventListener('click', () => {
    musicList.classList.toggle('show');
});

hideMusicBtn.addEventListener('click', () => {
    showMoreBtn.click();
});

const ulTag = wrapper.querySelector('ul');

for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li>
        <div class="row">
            <span>${allMusic[i].name}</span>
            <p>${allMusic[i].artist}</p>
        </div>
        <audio class="${allMusic[i].src}" src="./assets/songs/${allMusic[i].src}.mp3"></audio>
        <span id="${allMusic[i].src}" class="audio-duration"></span>
    </li>`;
    ulTag.insertAdjacentHTML('beforeend', liTag);

    let liAudioTagDuration = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudioTag.addEventListener('loadeddata', () => {
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);

        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }

        liAudioTagDuration.innerText = `${totalMin}:${totalSec}`;
    });
}