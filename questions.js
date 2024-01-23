var score = 0;
var container = document.querySelector ("#container");
var quizContent = document.querySelector ("#quizContent");
var questtionTitle = document.querySelector ("#qTitle");
var timer = document.querySelector ("#timer");
var startBtn = document.querySelector ("#start");

var questions = [
    {
        title: "_______ is the process of finding errors and fixing them within a program.",
        choices: [ "Compiling", "Executing", "Debugging", "Scanning"],
        answer: "Debugging"
    },
    {
        title: "Which of the following is not a required part of a for loop?",
        choices: ["Initialization", "Condition", "Variable", "Incremnet"],
        answer: "Variable"
    },
    {
        title: "What is an Array?",
        choices: ["A fish", "A collection of items, or data", ],
        answer: "A collection of items, or data"
    }
];

var questionIndex = 0;

var createUl = document.createElement("Ul");
createUl.setAttribute("id","optionsUl")

var timeInterval = 0;
var countdown = 60;
var penalty = 10;

startBtn.addEventListener("click", function() {
    if (timeInterval === 0){
        timeInterval = setInterval(function() {
            countdown--;
            timer.textContent = "Time:" + countdown;
            if (countdown <= 0) {
                clearInterval (timeInterval);
                theEnd();
            }
        }, 1000);
    }
    newQuestion (questionIndex)
});

//Generating new questions. Questions are showing up false and not going to the next questions. 
function newQuestion (questionIndex) {
    quizContent.innerHTML = "";
    createUl.innerHTML = "";
    var displayQuestion = document.createElement("h2");

    for (var i = 0; i < questions.length; i++) {
        displayQuestion.innerHTML = questions [questionIndex].title;
        var displayChoices = questions [questionIndex].choices;
        quizContent.appendChild(displayQuestion);
    }
    console.log(displayChoices);
    displayChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.innerHTML += "<button"> + newItem +"</button>";
        quizContent.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (checkAns));
    })
}
var i=0;
var newDiv = document.createElement("div");
var feedback = document.createElement("h3");
newDiv.setAttribute("id", "newDiv");
// checking to see if answer is correct. 
function checkAns(event) {
    var choice = event.target;
    quizContent.appendChild(newDiv);
    newDiv.appendChild(feedback);
    var next = document.createElement ("button");
    next.setAttribute("id", "nextButton");
    next.textContent = "Next Question";

    if (choice.textContent == questions [questionIndex] .answer) {
        score++;
        feedback.textContent = "Correct";
        newDiv.appendChild(feedback);
        newDiv.appendChild(next);
        next.addEventListener("click", (movingOn));
    } else {
        countdown = countdown - penalty;
        feedback.textContent = "Incorrect";
        newDiv.appendChild(feedback);
    }
}
//deciding if it is going to go to final page or go to next question
function movingOn(event) {
    newDiv.innerHTML ="";
    questionIndex++;
    if (questionIndex >= questions.length){
        theEnd();
    }else{
        newQuestion(questionIndex);
    }
}

function theEnd () {
    quizContent.innerHTML = "";
    timer.innerHTML = "";

    //Setting up the high score page
    var newH1 = document.createElement("h1");
    newH1.setAttribute("id", "newH1");
    newH1.textContent = "Completed"
    quizContent.appendChild(newH1);
    //Display of final score
    if (countdown >= 0) {
        score=countdown;
        clearInterval (timeInterval);
        var newP = document.createElement("p");
        newP.textContent = "Final score:" + score;
        quizContent.appendChild(newP);
    }else{
        score = 0;
        var outOfTime = document.createElement("h2");
        outOfTime.textContent = "Times up!";
        quizContent.appendChild(outOfTime);
        var newP = document.createElement("p");
        newP.textContent = "Final Score" + score;
        quizContent.appendChild(newP);
    }

    //unable to debugg the initial codes. Can't figure out where my code went bad. 
    var initialsPrompt = docutment.createElement ("label");
    initialsPrompt.setAttribute("for", "inputBox");
    initialsPrompt.textContent = "Please enter initials:";
    quizContent.appendChild(initialsPrompt);

    var inputBox = docuemnt.createElement("input");
    inputBox.setAttribute("type", "text");
    inputBox.setAttribute("id", "inputBox")
    inputBox.textContent = "";
    quizContent.appendChild(inputBox);

    var submit = document.createElement ("button");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "submit");
    submit.textContent = "submit";
    submit.setContent = "Submit";
    quizContent.appendChild(submit);
    //Adding event listener for the submission button, storage initials, and score.
    var initials = inputBox.value;

    if (initials==="") {
        console.log ("no initials entered")
        window.alert("Need an initial entry please");
    }else{
        var finalScore = {
            intials: initials,
            score: score
        }
        //Score history
        var storeScores = localStorage.getItem("storeScores");
        if (storeScores === null) {
            storeScores = [];
        }else{
            storeScores = JSON.parse(storeScores);
        }
        storeScores.push(finalScore);
    }
    storeScores.push(finalScore);
    var newScore = JSON.stringify(storeScores);
    localStorage.setItem("storeScores", "newScore");
    window.location.replace("highscore.html");
}