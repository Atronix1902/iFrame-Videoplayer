var sekformat   = new Intl.NumberFormat('de', {minimumIntegerDigits: "2"});                     //Creates format which forces numbers to have two digits at least
var body        = document.querySelector('body');                                               //<body>-tag
var play        = document.getElementById('play');                                              //Play-button
var pause       = document.getElementById('pause');                                             //Pause-button
var preload     = document.getElementById('preload');                                           //Preload-bar
var played      = document.getElementById('played');                                            //Played-bar
var video       = document.getElementById('video');                                             //Video
var overlay     = document.getElementById('overlay');                                           //Overlay
var empty       = document.getElementById('empty');                                             //Empty-Space for event-listening
var volume      = document.getElementById('volume');                                            //Volumeinformation-Container
var volIcons    = document.getElementById('volicons');                                          //Volumeicons-Container
var volBar      = document.getElementById('volume-bar');                                        //Volume-bar
var volBarInner = document.getElementById('volbar-inner');                                      //Volume-bar inner (configured volume)
var volBarWrap  = document.getElementById('volbar-wrapper');                                    //Wrapper for volume-bar
var volMin      = document.getElementById('volume-min');                                        //Icon for muted volume
var volMid      = document.getElementById('volume-mid');                                        //Icon for middle volume
var volMax      = document.getElementById('volume-max');                                        //Icon for max volume
var progBar     = document.getElementById('progress-bar');                                      //Progress-bar
var progBarWrap = document.getElementById('progbar-wrapper');                                   //Wrapper for progress-bar
var currentTime = document.getElementById('current');                                           //Current tiemstamp
var duration    = document.getElementById('duration');                                          //Duration of video
var expand      = document.getElementById('expand');                                            //Expand-button
var compress    = document.getElementById('compress');                                          //Compress-button
var pip         = document.getElementById('pip');                                               //Picture in Picture button
const pipAvail  = document.pictureInPictureEnabled || !video.disablePictureInPicture;           //If Picture in Picture is available
var timer;                                                                                      //Timer

/**
 * Opens fullscreen for whole body element
 * @author AtronixYT
 */
function openFullscreen() {
    if (body.requestFullscreen) {
      body.requestFullscreen();
    } else if (body.webkitRequestFullscreen) {      //Safari
      body.webkitRequestFullscreen();
    } else if (body.msRequestFullscreen) {          //Internet Explorer
      body.msRequestFullscreen();
    }
}

/**
 * Closes fullscreen
 * @author AtronixYT
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {     //Safari
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {         //Internet Explorer
      document.msExitFullscreen();
    }
}

/**
 * Enables Picture in Picture mode for video element
 * @author AtronixYT
 */
function picInPic() {
    try {
        if (!document.pictureInPictureElement) {    
            video.requestPictureInPicture();        //Requests Picture in Picture mode
        } else {
            document.exitPictureInPicture();        //Exits Picture in Picture mode
        }
    } catch(reason) {
        console.error(reason);
    }
}

/**
 * Initialises Eventlisteners, Styles and JS-Content
 * @author AtronixYT
 * @param {int} type decides design
 */
function initControl(type) {
    pause.style.display = 'none';                                           //Hides pause-button
    volMid.style.display = 'none';                                          //Hides volume-mid-icon
    volMin.style.display = 'none';                                          //Hides volume-min-icon
    compress.style.display = 'none';                                        //Hides compress-button
    pipAvail ? pip.style.display = 'inline' : pip.style.display = 'none';   //Hides PiP-button if PiP is not available

    /**
     * Adds eventlistener for mousemove on overlay
     * @author AtronixYT
     */
    overlay.addEventListener('mousemove', function() {
        overlay.style.opacity = 1;  	                                    //Shows Overlay
        clearTimeout(timer);                                                //Clears timer
        timer = setTimeout(function() {                                     //Sets new Timer for 5000ms (5sec)
            overlay.style.opacity = 0;                                      //After timer hides overlay
        }, 5000);                                                           //5000ms
    });

    /**
     * Adds eventlistener for click on empty-space
     * @author AtronixYT
     */
    empty.addEventListener('click', function() {
        if(video.paused) {                                                  //If video is paused
            video.play();                                                   //Plays video
        }
        else {                                                              //else
            video.pause();                                                  //Pauses video
        }
    });

    /**
     * Adds eventlistener for click on play-button
     * @author AtronixYT
     */
    play.addEventListener('click', function() {
        video.play();                                                       //Plays video
    });

    /**
     * Adds eventlistener for click on pause-button
     * @author AtronixYT
     */
    pause.addEventListener('click', function() {
        video.pause();                                                      //Pauses video
    });

    /**
     * Adds eventlistener for click on volume-icon-container
     * @author AtronixYT
     */
    volIcons.addEventListener('click', function() {
        if(video.muted) {                                                   //If video is muted
            video.muted = false;                                            //Unmute video
            console.log("Unmuted Video");                                   //Sends information to Console
        }
        else {                                                              //Else
            video.muted = true;                                             //Mutes video
            console.log("Muted Video");                                     //Sends information to Console
        }
    });

    /**
     * Adds eventlistener for click on expand-button
     * @author AtronixYT
     */
    expand.addEventListener('click', function() {
        openFullscreen();                                                   //Opnes fullscreen
        expand.style.display = 'none';                                      //Hides expand-button
        compress.style.display = 'inline';                                  //Shows compress-button
    });

    /**
     * Adds eventlistener for click on compress-button
     * @author AtronixYT
     */
    compress.addEventListener('click', function() {
        exitFullscreen();                                                   //Exits fullscreen
        expand.style.display = 'inline';                                    //Shows expand-button
        compress.style.display = 'none';                                    //Hides compress-button
    });

    /**
     * Adds eventlistener for click on Picture in Picture button
     * @author AtronixYT
     */
    pip.addEventListener('click', function() {
        picInPic();                                                         //Opens picture in picture mode
    });

    /**
     * Adds eventlistener for pause of video
     * @author AtronixYT
     */
    video.addEventListener('pause', function() {
        play.style.display = 'inline';                                      //Shows play-button
        pause.style.display = 'none';                                       //Hides pause-button
        console.log("Pause");                                               //Sends information to console
    });

    /**
     * Adds eventlistener for play of video
     */
    video.addEventListener('play', function() {
        play.style.display = 'none';                                        //Hides play-button
        pause.style.display = 'inline';                                     //Shows pause-button
        console.log("Play");                                                //Sends information to console
    });

    /**
     * Adds eventlistener for loading-progress of video
     * @author AtronixYT
     */
    video.addEventListener('progress', function() {
        if(video.buffered.length>0) {                                       //If loaded information of video is bigger than 0
            if(type == 2) {                                                 //If Style is type 2
                preload.style.height = 100 * video.buffered.end(0) / video.duration + "%";  //Sets new height of preload-bar
            }
            else {                                                          //Every other style
                preload.style.width = 100 * video.buffered.end(0) / video.duration + "%";   //Sets new width of preload-bar
            }
            console.log('Preload: ' + 100 * video.buffered.end(0) / video.duration + "%");  //Sends information to Console
        }
    });

    /**
     * Adds eventlistener for timeupdate of video
     */
    video.addEventListener('timeupdate', function() {
        if(type == 2) {                                                     //If Style is type 2
            played.style.height = 100 * video.currentTime / video.duration + "%";   //Sets new height for played-bar
        }                               
        else {                                                              //Every other style
            played.style.width = 100 * video.currentTime / video.duration + "%";    //Sets new width for played-bar
        }
        currentTime.innerText = Math.floor(video.currentTime/60) + ":" + sekformat.format(Math.floor(video.currentTime%60));    //Updates current time value
    });

    /**
     * Adds eventlistener for loaded metadata of video
     * @author AtronixYT
     */
    video.addEventListener('loadedmetadata', function() {
        currentTime.innerText = Math.floor(video.currentTime/60) + ":" + sekformat.format(Math.floor(video.currentTime%60));    //Updates current time value
        duration.innerText = Math.floor(video.duration/60) + ":" + sekformat.format(Math.floor(video.duration%60));             //Updates duration time value
    });

    /**
     * Adds eventlistener for end of video
     * @author AtronixYT
     */
    video.addEventListener('ended', function() {
        play.style.display = 'inline';                                      //Shows play-button
        pause.style.display = 'none';                                       //Hides pause-button
    });

    /**
     * Adds eventlistener for volumechange of video
     */
    video.addEventListener('volumechange', function() {
        if(type == 2) {                                                     //If Style is type 2
            volBarInner.style.height = 100 * video.volume + "%";            //Sets new height of volume-bar-inner
        }
        else {                                                              //Every other style
            volBarInner.style.width = 100 * video.volume + "%";             //Sets new width of volume-bar-inner
        }
        
        if (video.muted || video.volume <= 0) {                             //If video is muted or volume is less or equal 0
            volMax.style.display = 'none';                                  //Hides volume-max icon
            volMin.style.display = 'inline';                                //Shows volume-min icon
            volMid.style.display = 'none';                                  //Hides volume-mid icon
        } else if(video.volume < 0.5) {                                     //If volume is lower than 50%
            volMax.style.display = 'none';                                  //Hides volume-max icon
            volMin.style.display = 'none';                                  //Hides volume-min icon
            volMid.style.display = 'inline';                                //Shows volume-mid icon
        } else {                                                            //Every other state
            volMax.style.display = 'inline';                                //Shows volume-max icon
            volMin.style.display = 'none';                                  //Hides volume-min icon
            volMid.style.display = 'none';                                  //Hides volume-mid icon
        }
    });

    /**
     * Adds eventlistener for mousemove on progress-bar-wrapper
     * @author AtronixYT
     */
    progBarWrap.addEventListener('mousemove', function(event) {
        if(type == 2) {                                                     //If Style is type 2
            if (event.buttons == 1) {                                       //If button is pressed
                let height = progBarWrap.clientHeight;                      //Gets height of progrbarwrapper
                let mousePos = event.offsetY;                               //Gets offset of mouse
                let factor = mousePos / height;                             //Gets offset in percent
                let vidDuration = video.duration;                           //Gets video duration
                let targetTime = vidDuration* (1-factor);                   //Calculates new Time from duration and offset percentage
                video.currentTime = targetTime;                             //Sets new time as current time of video
            }
        }
        else {                                                              //Every other style
            if (event.buttons == 1) {                                       //If button is pressed
                let width = progBarWrap.clientWidth;                        //Gets width of progress-bar-wrapper
                let mousePos = event.offsetX;                               //Gets offset of mous
                let factor = mousePos / width;                              //Gets offset in percent
                let vidDuration = video.duration;                           //Gets duration of video
                let targetTime = vidDuration*factor;                        //Calculates new time from duration and offset percentage
                video.currentTime = targetTime;                             //Sets new time as current time of video
            }
        }
    });

    /**
     * Adds eventlistener for click on progress-bar-wrapper
     * @author AtronixYT
     */
    progBarWrap.addEventListener('click', function(event) {
        if(type == 2) {                                                     //If Style is type 2
            let height = progBarWrap.clientHeight;                          //Gets height of progrbarwrapper
            let mousePos = event.offsetY;                                   //Gets offset of mouse
            let factor = mousePos / height;                                 //Gets offset in percent
            let vidDuration = video.duration;                               //Gets video duration
            let targetTime = vidDuration* (1-factor);                       //Calculates new Time from duration and offset percentage
            video.currentTime = targetTime;                                 //Sets new time as current time of video
        }
        else {                                                              //Every other style
            let width = progBarWrap.clientWidth;                            //Gets width of progress-bar-wrapper
            let mousePos = event.offsetX;                                   //Gets offset of mous
            let factor = mousePos / width;                                  //Gets offset in percent
            let vidDuration = video.duration;                               //Gets duration of video
            let targetTime = vidDuration*factor;                            //Calculates new time from duration and offset percentage
            video.currentTime = targetTime;                                 //Sets new time as current time of video
        }
    });

    /**
     * Adds eventlistener for mousemove on progress-bar-wrapper
     * @author AtronixYT
     */
    volBarWrap.addEventListener('mousemove', function(event) {
        if(type == 2) {                                                     //If Style is type 2
            if (event.buttons == 1) {                                       //If button is pressed
                let height = volBarWrap.clientHeight;                       //Gets height of volume-bar-wrapper
                let mousePos = event.offsetY;                               //Gets mouse-offset
                let factor = mousePos / height;                             //Gets offset percentage
                video.volume = 1-factor;                                    //Sets offset percentage as volume
            }
        }
        else {                                                              //Every other style
            if (event.buttons == 1) {                                       //If button is pressed
                let width = volBarWrap.clientWidth;                         //Gets width of volume-bar-wrapper
                let mousePos = event.offsetX;                               //Gets mouse-offset
                let factor = mousePos / width;                              //Gets offset percentage
                video.volume = factor;                                      //Sets offset percentage as volume
            }
        }
    });

    /**
     * Adds eventlistener for click on progress-bar-wrapper
     * @author AtronixYT
     */
    volBarWrap.addEventListener('click', function(event) {
        if(type == 2) {                                                     //If Style is type 2
            let height = volBarWrap.clientHeight;                           //Gets height of volume-bar-wrapper
            let mousePos = event.offsetY;                                   //Gets mouse-offset
            let factor = mousePos / height;                                 //Gets offset percentage
            video.volume = 1-factor;                                        //Sets offset percentage as volume
        }
        else {                                                              //Every other style
            let width = volBarWrap.clientWidth;                             //Gets width of volume-bar-wrapper
            let mousePos = event.offsetX;                                   //Gets mouse-offset
            let factor = mousePos / width;                                  //Gets offset percentage
            video.volume = factor;                                          //Sets offset percentage as volume
        }
    });
}