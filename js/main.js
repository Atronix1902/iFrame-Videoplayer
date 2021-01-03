var play = document.getElementById('play');
var pause = document.getElementById('pause');
var preload = document.getElementById('preload');
var played = document.getElementById('played');
var video = document.getElementById('video');
var overlay =  document.getElementById('overlay');
var empty = document.getElementById('empty');
var volume = document.getElementById('volume');
var volMin = document.getElementById('volume-min');
var volMid = document.getElementById('volume-mid');
var volMax = document.getElementById('volume-max');
var progBar = document.getElementById('progress-bar'); 

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
    volMid.style.display = 'none';
    volMin.style.display = 'none';

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
            played.style.width = 100 * video.currentTime / video.duration + "%";
        }    
    });

    progBar.addEventListener('mousemove', function(event) {
        //Setzt die aktuelle Zeit beim anklicken und bewegen innerhalb des Zeitstrahls
        if (event.buttons == 1) { //Prüft ob eine Maustaste gedrückt ist
            //Erfasst die gesamte Breite des .soundline-inner Elements und dann die Mausposition relativ zu dem Element
            let width = progBar.clientWidth;
            let mousePos = event.offsetX;

            //errechnet den Faktor der die Position des Cursors repräsentiert
            let factor = mousePos / width;

            //errechnet den neuen Wet des currentTime Attributs
            let duration = video.duration;
            let targetTime = duration*factor;

            //Setzt die neue currentTime
            //Der innere Teil der soundline wird automatisch aktualisiert
            video.currentTime = targetTime;
        }
    });

    progBar.addEventListener('click', function(event) {
        //Erfasst die gesamte Breite des .soundline-inner Elements und dann die Mausposition relativ zu dem Element
        let width = progBar.clientWidth;
        let mousePos = event.offsetX;

        //errechnet den Faktor der die Position des Cursors repräsentiert
        let factor = mousePos / width;

        //errechnet den neuen Wet des currentTime Attributs
        let duration = video.duration;
        let targetTime = duration*factor;

        //Setzt die neue currentTime
        //Der innere Teil der soundline wird automatisch aktualisiert
        video.currentTime = targetTime;
    });

    vol
}