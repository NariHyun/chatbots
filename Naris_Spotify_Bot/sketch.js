let data; //variable for json data
let inp; //variable for input field
let sendBttn; //variable for send button
let answer = ""; //variable for the answer from the chatbot
let bg;

//load the JSON file
function preload() {
  data = loadJSON("chatbots.json");
  bg = loadImage("IMG_2481.jpg");
}
function setup() {
  createCanvas(360,760);
  //input field
  inp = createInput("");
  inp.size(300, 40);
  inp.position(width / 13, 570);
  //button to send input
  sendBttn = createButton("SEND");
  sendBttn.size(70, 65);
  sendBttn.position(144, 662);
  sendBttn.mousePressed(answerMe); //callback to let the chatbot respond
  textAlign(CENTER);
  rectMode(CENTER);
  console.log(data);
}
function keyPressed(){
  if(keyCode===ENTER){
    answerMe(); //let the chatbot respond when enter key pressed
  }
}

function draw() {
  background(bg);
  fill("white");
  textSize(20);
  text("Nari's Spotify Bot", width / 2, 80);
  textSize(14);
  text("🎸Rock n' Roll🎸", width / 2, 102);
  //display the answer from the chatbot
  fill("Ivory");
  textSize(22);
  text(answer, width / 2, 260, width - 20);
}

function answerMe() {
  //prepare the input string for analysis
  let inputStr = inp.value();
  inputStr = inputStr.toLowerCase();

  //loop through the answers array and match responses to triggers
  loop1: for (let i = 0; i < data.brain.length; i++) {
    loop2: for (let j = 0; j < data.brain[i].triggers.length; j++) {
      if (inputStr.indexOf(data.brain[i].triggers[j]) !== -1) {
        answer = random(data.brain[i].responses);
        break loop1; //break out of the loop once a match is found to prevent the program to keep looping to the last group
      } else {
        answer = random(data.catchall);
      }
    }
  }
  inp.value("");//clears the input field once an answer occurs
}
