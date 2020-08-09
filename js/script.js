let buttonplay = document.querySelector(".play"),
    buttonpause = document.querySelector(".pause"),
    volume = document.querySelector(".volume"),
    vol = document.querySelector(".vol"),
    tracktable = document.querySelector(".tracktable"),
    stb = document.querySelectorAll(".stb"),
    imgfont = document.querySelectorAll(".imgfont"),
    progress = document.querySelector("progress"),
    volu = document.getElementById('volu'),
    up = document.querySelector(".up"),
    prew = document.querySelector(".do"),
    tracklist = document.querySelector(".tracklist"),
    playy = document.querySelectorAll(".playy"),
    playimg = document.querySelectorAll(".playimg"),
    titiletrack = document.querySelectorAll(".titiletrack"),
    soundp = document.querySelectorAll(".soundp"),
    pausee = document.querySelectorAll(".pausee"),
    namber = document.querySelectorAll(".namber"),
    repeatimg = document.querySelector(".repeatimg"),
    repeatred = document.querySelector(".repeatred"),
    repeat = document.querySelector(".repeat"),
    turn = document.querySelector(".turn"),
    turnimg = document.querySelector(".turnimg"),
    turnred = document.querySelector(".turnred");

var song;
var cover;
var n = 1;
var t = true; 

function initAudio(e) {
    var coverA = document.querySelector('.imgalb').innerHTML = '<img src="../music/cover/cover' + e + '.jpg" alt="" class="playimg"></img>';
    var  url = document.querySelectorAll(".titiletrack")[e-1].textContent;
    song = new Audio('../music/' + url + '.mp3'); 
    var  url = document.querySelectorAll(".titiletrack")[e-1].textContent;
    var  title = document.querySelectorAll(".titiletrack")[e-1].textContent;
    var artist = document.querySelectorAll(".artisttit")[e-1].textContent;
    var name = document.querySelector(".title");
    title = title.replace(/[^a-zA-ZА-Яа-яЁё]/gi,'').replace(/\s+/gi,', ');
    title = title.replace(/([A-Z])/g, ' $1').trim()
    name.textContent = title;

    // progressBarr click
    rng.addEventListener('mousedown', function(event) {
        t = false;
    });

    rng.addEventListener('click', function(event) {
        song.currentTime = rng.value; 
        t = true;
    });
    
    // timeupdate
    song.addEventListener('timeupdate',function (){
        var rng = document.getElementById("rng");
        var curtime = parseInt(song.currentTime, 10);
        rng.max =  song.duration;
        song.volume = volu.value;
        if(song.currentTime == song.duration){
            if(rep == false){
                initAudio(e);
                playAudio();
                n = e;
            }else{
                initAudio(e+1);
                playAudio();
                n = e+1;
            }
        }

        // update color name 
        for(let i = 0; i < titiletrack.length; i++) {
            titiletrack[i].style.color = "#000000";
            if(i == e) {
                titiletrack[i-1].style.color = "red";
            }
        }

        //curtime
        if(t == true){
            rng.value = curtime;
        }
        var min = Math.floor(rng.value/60);
        var sec = rng.value % 60;
            if(min < 10) {
                min = '0' + min;
            }
            if(sec < 10){
                sec = '0' + sec;
            }
            var timess = document.querySelector('.times').textContent = min + ":" + sec;

            //duration
            if (song.duration > 0){
                var min = Math.floor(song.duration/60);
                var sec = Math.floor(song.duration % 60);
                if(min < 10) {
                    min = '0' + min;
                }
                if(sec < 10){
                    sec = '0' + sec;
                }
            } 
            var duration = document.querySelector('.timea').textContent = min + ":" + sec;
            var x = 'NaN:NaN';
            if (duration.textContent == x){
                duration.textContent = "00:00";
            }
        });
        console.log(url + ".mp3");
        console.log(title);
        console.log(artist); 
} 

//anim img update
function timapp(){
    for(i = 0; i  < 5; i++){
        if(titiletrack[i].style.color == "red" && buttonplay.classList.contains("hidden") && playy[i].classList.contains("hidden") && pausee[i].classList.contains("hidden")) {
            soundp[i].classList.remove("hidden");
        }else{
            soundp[i].classList.add("hidden");
        }
    }
}
let timerId = setInterval(timapp, 10);

function playAudio(){
    //soundp[n-1].classList.add("hidden");
    buttonplay.classList.add('hidden');
    buttonpause.classList.remove('hidden');
    song.play();  
    n = 1;
}

function pauseAudio(){
    buttonpause.classList.add('hidden');   
    buttonplay.classList.remove('hidden');
    var pausee = document.querySelectorAll(".pausee");
    var  playy = document.querySelectorAll(".playy");
    song.pause(); 
}

function upTrack() {
    n++;
    if(n == titiletrack.length){
        n = 1;
    }
    song.pause();
    initAudio(n); 
    song.play(); 
    console.log(n);
}

function prewTrack() {
    n--;
    if(n == 0) {
        n = titiletrack.length-1; 
    }
    song.pause();
    initAudio(n); 
    song.play();
    console.log(n);
}

// play click
buttonplay.addEventListener('click', function(event) {
    playAudio();   
});

//pause click
buttonpause.addEventListener('click', function(event) {
    pauseAudio();
});

//up click 
up.addEventListener('click', function(event) {
    buttonpause.classList.remove('hidden');   
    buttonplay.classList.add('hidden');
    upTrack();
});

//prew click 
prew.addEventListener('click', function(event) {
    prewTrack();
});

// clik playlist 
var time = 0;
tracklist.addEventListener('click', function(event) {
    let target = event.target;
    if (target && target.classList.contains('imgfont')) {
        for(let i = 0; i < titiletrack.length; i++) {
            if(target == imgfont[i-1]) {
                if(pausee[i-1].classList.contains("hidden")){
                    playy[i-1].classList.add("hidden");
                    pausee[i-1].classList.remove("hidden");
                    pauseAudio();
                    initAudio(i);
                    if(titiletrack[i-1].style.color == "red"){
                        song.currentTime = time;
                    }else{
                        song.currentTime = 0;
                    }
                    playAudio(); 
                    n = i;
                }else{
                    time = song.currentTime;
                    playy[i-1].classList.remove("hidden");
                    pausee[i-1].classList.add("hidden");
                    pauseAudio();
                }
            }
        }
    }
});

//repeat
var rep = true;
repeat.addEventListener('click', function(){
    if(repeatred.classList.contains("hidden")){
        repeatimg.classList.add("hidden");
        repeatred.classList.remove("hidden");
        rep = false;
    }else{
        repeatred.classList.add("hidden");
        repeatimg.classList.remove("hidden");
        rep = true;
    }
});

turn.addEventListener('click', function(){
    if(turnred.classList.contains("hidden")){
        turnimg.classList.add("hidden");
        turnred.classList.remove("hidden");
    }else{
        turnred.classList.add("hidden");
        turnimg.classList.remove("hidden");
    }
});

//hover track list mouseover
tracklist.addEventListener('mouseover', function(event) {
    let target = event.target;
    if (target && target.classList.contains('titiletrack')) {
        for(let i = 1; i < titiletrack.length+1; i++) {
            if(target == titiletrack[i-1]) {
                soundp[i-1].classList.add("hidden");
                if(titiletrack[i-1].style.color == "red" && buttonplay.classList.contains("hidden")){
                    pausee[i-1].classList.remove("hidden");
                }else{
                    playy[i-1].classList.remove("hidden")
                }
            }
        }
    }
    if (target && target.classList.contains('imgfont')) {
        for(let i = 1; i < imgfont.length+1; i++) {
            if(target == imgfont[i-1]) {
                soundp[i-1].classList.add("hidden");
                if(titiletrack[i-1].style.color == "red" && buttonplay.classList.contains("hidden")){
                    pausee[i-1].classList.remove("hidden");
                }else{
                    playy[i-1].classList.remove("hidden")
                }
            } 
        }
    }
    if (target && target.classList.contains('namber')) {
        for(let i = 1; i < namber.length+1; i++) {
            if(target == namber[i-1]) {
                soundp[i-1].classList.add("hidden");
                if(titiletrack[i-1].style.color == "red" && buttonplay.classList.contains("hidden")){
                    pausee[i-1].classList.remove("hidden");
                }else{
                    playy[i-1].classList.remove("hidden")
                }
            }
        }
    }
});

//hover track list mouseout
tracklist.addEventListener('mouseout', function(event) {
    let target = event.target;
    if (target && target.classList.contains('titiletrack')) {
        for(let i = 1; i < titiletrack.length+1; i++) {
            playy[i-1].classList.add("hidden");
            pausee[i-1].classList.add("hidden");
            
        }
    }
    if (target && target.classList.contains('imgfont')) {
        for(let i = 1; i < imgfont.length+1; i++) {
            playy[i-1].classList.add("hidden");
            pausee[i-1].classList.add("hidden");
        }
    }
    if (target && target.classList.contains('namber')) {
        for(let i = 1; i < namber.length+1; i++) {
            playy[i-1].classList.add("hidden");
            pausee[i-1].classList.add("hidden");
        }
    } 
});

tracklist.addEventListener('mouseout', function(event) {
    for(i = 0; i > 10; i++){
        playy[i].classList.add("hidden");
    }
});

// show/hidde volume  
vol.addEventListener('mouseover', function(event) {
    vol.classList.remove('hidden'); 
    vol.classList.add('volume'); 
});

vol.addEventListener('mouseout', function(event) {
    vol.classList.add('hidden');  
});

volume.addEventListener('mouseover', function(event) {
    vol.classList.remove('hidden'); 
    vol.classList.add('volume'); 
});

volume.addEventListener('mouseout', function(event) {
    vol.classList.add('hidden'); 
});

initAudio(n);