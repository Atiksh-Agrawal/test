noseX,noseY = 0;

difference = 0;
rightHandX = 0;
leftHandX = 0;

function setup(){
    canvas = createCanvas(550,500);
    canvas.position(600,200);
    video = createCapture(VIDEO);
    video.size(400,400);

    poseNet = ml5.poseNet(video,modelLoaded);

    poseNet.on('pose',getPoses);
}

function draw(){
   background("beige");
   fill("red");
   stroke("#000000");
   square(noseX,noseY,difference);

   document.getElementById("square_length").innerHTML = "Length of the square  =  " + difference +"px"; 
}

function modelLoaded(){
    console.log("posenet is initialized");
}

function getPoses(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;

        rightHandX = results[0].pose.rightWrist.x;
        leftHandX = results[0].pose.leftWrist.x;
        difference = floor (leftHandX - rightHandX);
    }
}