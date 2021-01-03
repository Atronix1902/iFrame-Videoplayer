var play = document.getElementById('play');
var pause = document.getElementById('pause');
var preload = document.getElementById('preload');
var played = document.getElementById('played');
var video = document.getElementById('video');
var overlay =  document.getElementById('overlay');
var empty = document.getElementById('empty');

function playVideo() {
    document.getElementById('video').play();
    console.log("Play");
    play.style.display = 'none';
    pause.style.display = 'inline';
}

function pauseVideo() {
    document.getElementById('video').pause();
    console.log("Pause");
    play.style.display = 'inline';
    pause.style.display = 'none';
}

function initControl() {
    pause.style.display = 'none';

    empty.addEventListener('click', function() {
        if(video.paused) {
            playVideo();
        }
        else {
            pauseVideo();
        }
    });

    play.addEventListener('click', function() {
        playVideo();
    });

    pause.addEventListener('click', function() {
        pauseVideo();
    });

    video.addEventListener('progress', function() {
        if(video.buffered.length>0) {
            preload.style.width = 100 * video.buffered.end(0) / video.duration + "%";
        }
    });

    video.addEventListener('timeupdate', function() {
        if(video.played.length>0) {
            played.style.width = 100 * video.played.end(0) / video.duration + "%";
        }    
    });
}