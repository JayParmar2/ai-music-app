song1 = "";
scoreleftWrist = 0;
song1status = "";
song2status = "";
song2 = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelloaded);
    posenet.on('pose', gotposes);
}

function draw() {
    image(video, 0, 0, 600, 500);
    song1status = song1.isPlaying();
    song2status = song2.isPlaying();
    if (scoreleftWrist > 0.1) {
        song1.stop();
        if (song2status == false) {
            song2.play();
            document.getElementById("status").innerHTML = "playing - peterpan song";

        }
    }
}

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");

}

function modelloaded() {
    console.log("Posenet is initialised");


}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);

        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("leftwristX = " + leftwristX + " leftwristY = " + leftwristY);

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("rightwristX = " + rightwristX + " rightwristY = " + rightwristY);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("score leftwrist = " + scoreleftWrist);
    }
}