//Erstellt ein Format, dass einen Integer dazu zwingt 2 Stellen zu haben.
var sekformat   = new Intl.NumberFormat('de', {minimumIntegerDigits: "2"});

var body        = document.querySelector('body');
var play        = document.getElementById('play');
var pause       = document.getElementById('pause');
var preload     = document.getElementById('preload');
var played      = document.getElementById('played');
var video       = document.getElementById('video');
var overlay     = document.getElementById('overlay');
var empty       = document.getElementById('empty');
var volume      = document.getElementById('volume');
var volBar      = document.getElementById('volume-bar');
var volBarInner = document.getElementById('volbar-inner');
var volBarWrap  = document.getElementById('volbar-wrapper');
var volMin      = document.getElementById('volume-min');
var volMid      = document.getElementById('volume-mid');
var volMax      = document.getElementById('volume-max');
var progBar     = document.getElementById('progress-bar'); 
var progBarWrap = document.getElementById('progbar-wrapper');
var currentTime = document.getElementById('current');
var duration    = document.getElementById('duration');
var expand      = document.getElementById('expand');
var compress    = document.getElementById('compress');
var pip         = document.getElementById('pip');
const pipAvail  = document.pictureInPictureEnabled || !video.disablePictureInPicture;
var timer;

function openFullscreen() {
    if (body.requestFullscreen) {
      body.requestFullscreen();
    } else if (body.webkitRequestFullscreen) {  //Safari
      body.webkitRequestFullscreen();
    } else if (body.msRequestFullscreen) {      //Internet Explorer
      body.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { //Safari
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {     //Internet Explorer
      document.msExitFullscreen();
    }
}

function picInPic() {
    try {
        if (!document.pictureInPictureElement) {
            video.requestPictureInPicture();
        } else {
            document.exitPictureInPicture();
        }
    } catch(reason) {
        console.error(reason);
    }
}

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
    compress.style.display = 'none';
    pipAvail ? pip.style.display = 'inline' : pip.style.display = 'none';

    overlay.addEventListener('mousemove', function() {
        overlay.style.opacity = 1;
        clearTimeout(timer);
        timer = setTimeout(function() {
            overlay.style.opacity = 0;
        }, 5000);
    });

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

    expand.addEventListener('click', function() {
        openFullscreen();
        expand.style.display = 'none';
        compress.style.display = 'inline';
    });

    compress.addEventListener('click', function() {
        exitFullscreen();
        expand.style.display = 'inline';
        compress.style.display = 'none';
    });

    pip.addEventListener('click', function() {
        picInPic();
    });

    video.addEventListener('progress', function() {
        if(video.buffered.length>0) {
            preload.style.width = 100 * video.buffered.end(0) / video.duration + "%";
        }
    });

    video.addEventListener('timeupdate', function() {
        played.style.width = 100 * video.currentTime / video.duration + "%";
        currentTime.innerText = Math.floor(video.currentTime/60) + ":" + sekformat.format(Math.floor(video.currentTime%60));;
    });

    video.addEventListener('loadedmetadata', function() {
        currentTime.innerText = Math.floor(video.currentTime/60) + ":" + sekformat.format(Math.floor(video.currentTime%60));;
        duration.innerText = Math.floor(video.duration/60) + ":" + sekformat.format(Math.floor(video.duration%60));
    });

    video.addEventListener('volumechange', function() {
        volBarInner.style.width = 100 * video.volume + "%";
        if (video.muted || video.volume <= 0) {
            volMax.style.display = 'none';
            volMin.style.display = 'inline';
            volMid.style.display = 'none';
        } else if(video.volume < 0.5) {
            volMax.style.display = 'none';
            volMin.style.display = 'none';
            volMid.style.display = 'inline';
        } else {
            volMax.style.display = 'inline';
            volMin.style.display = 'none';
            volMid.style.display = 'none';
        }
    });

    progBarWrap.addEventListener('mousemove', function(event) {
        //Setzt die aktuelle Zeit beim anklicken und bewegen innerhalb des Zeitstrahls
        if (event.buttons == 1) { //Prüft ob eine Maustaste gedrückt ist
            //Erfasst die gesamte Breite des progBarWrap Elements und dann die Mausposition relativ zu dem Element
            let width = progBarWrap.clientWidth;
            let mousePos = event.offsetX;

            //errechnet den Faktor der die Position des Cursors repräsentiert
            let factor = mousePos / width;

            //errechnet den neuen Wet des currentTime Attributs
            let vidDuration = video.duration;
            let targetTime = vidDuration*factor;

            //Setzt die neue currentTime
            //Der innere Teil der soundline wird automatisch aktualisiert
            video.currentTime = targetTime;
        }
    });

    progBarWrap.addEventListener('click', function(event) {
        //Erfasst die gesamte Breite des progBarWrap Elements und dann die Mausposition relativ zu dem Element
        let width = progBarWrap.clientWidth;
        let mousePos = event.offsetX;

        //errechnet den Faktor der die Position des Cursors repräsentiert
        let factor = mousePos / width;

        //errechnet den neuen Wet des currentTime Attributs
        let vidDuration = video.duration;
        let targetTime = vidDuration*factor;

        //Setzt die neue currentTime
        //Der innere Teil der soundline wird automatisch aktualisiert
        video.currentTime = targetTime;
    });

    volBarWrap.addEventListener('mousemove', function(event) {
        //Setzt die aktuelle Lautstärke beim anklicken und bewegen innerhalb des Lautstärkestrahls
        if (event.buttons == 1) { //Prüft ob eine Maustaste gedrückt ist
            //Erfasst die gesamte Breite des volBarWrap Elements und dann die Mausposition relativ zu dem Element
            let width = volBarWrap.clientWidth;
            let mousePos = event.offsetX;

            //errechnet den Faktor der die Position des Cursors repräsentiert
            let factor = mousePos / width;

            //Setzt die neue Volume
            //Der innere Teil der soundline wird automatisch aktualisiert
            video.volume = factor;
        }
    });

    volBarWrap.addEventListener('click', function(event) {
            //Erfasst die gesamte Breite des volBarWrap Elements und dann die Mausposition relativ zu dem Element
            let width = volBarWrap.clientWidth;
            let mousePos = event.offsetX;

            //errechnet den Faktor der die Position des Cursors repräsentiert
            let factor = mousePos / width;

            //Setzt die neue Volume
            //Der innere Teil der soundline wird automatisch aktualisiert
            video.volume = factor;
    });
}