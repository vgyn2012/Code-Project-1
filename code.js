var triviaQuestions = getColumn("Trivia", "Question");
var triviaAnswers = getColumn("Trivia", "Answer");
var triviaCorrect = getColumn("Trivia", "Correct");
var questions = filterQuestions(triviaQuestions);

var questionIndex = 0;
var score = 0;

function filterQuestions(list) {
  var filteredList = [];
  for(var i=0;i <list.length; i++) {
    if(filteredList.indexOf(list[i]) == -1) {
      filteredList.push(list[i]);
    }
  }
  return(filteredList);
} 

function filterOptions(question) {
  var filteredList = [];
  for(var i=0;i<triviaAnswers.length;i++) {
    if(triviaQuestions[i] == question) {
      filteredList.push(triviaAnswers[i]);
    }
  }
  return(filteredList);
}

function filterCorrect(question) {
  var filteredList = [];
  for(var i=0;i<triviaCorrect.length;i++) {
    if(triviaQuestions[i] == question) {
      filteredList.push(triviaCorrect[i]);
    }
  }
  return(filteredList);
}



function pickNextQuestion() {
  setText("question", questions[questionIndex]);
  var space = 0;
  var options = filterOptions(questions[questionIndex]);
  for(var i = 0;i< options.length;i++) {
    radioButton("optionradio" + i, false, "options");
    setPosition("optionradio" + i, 70, 180 + 20*space);
    textLabel("optionlabel" + i, options[i]);
    setPosition("optionlabel" + i, 80, 177 + 20*space);
    space++;
  }
}

function getCorrectAnswer() {
  var options = filterOptions(questions[questionIndex]);
  var correct = filterCorrect(questions[questionIndex]);
  var correctAnswer = "";
  for(var i =0;i<options.length;i++) {
    if(correct[i]) {
      correctAnswer = options[i];
    }
  }
  return(correctAnswer);
}

function checkAnswer(selectedAnswer) {
  var result = false;
  var correctAnswer = getCorrectAnswer();
  if(correctAnswer == selectedAnswer) {
    result = true;
  }
  return(result);
}

function populateResultScreen(result) {
  setText("Question", questions[questionIndex]);
  if(result) {
    setText("Result", "Correct! Your answer was : ");
    setProperty("Result", "text-color", "green");
  }
  else {
    setText("Result", "Incorrect! The correct answer is : ");
    setProperty("Result", "text-color", "red");
  }
  setText("Answer", getCorrectAnswer());
}

onEvent("startButton", "click", function( ) {
  setScreen("QuestionScreen");
  pickNextQuestion();
});

onEvent("submit", "click", function( ) {
  var selectedAnswer = "";
  var options = filterOptions(questions[questionIndex]);
  for(var i = 0;i < options.length; i++) {
      if(getChecked("optionradio" + i)) {
        selectedAnswer = options[i];
      }
  }
  var result = checkAnswer(selectedAnswer);
  if(result)
  {
    score++;
  }

  setScreen("ResultScreen");
  populateResultScreen(result);
});

function clearOptions() {
  var options = filterOptions(questions[questionIndex]);
  for(var i = 0;i<options.length;i++) {
      deleteElement("optionradio" + i);
      deleteElement("optionlabel" + i);
  }
}

onEvent("nextQuestion", "click", function( ) {
  clearOptions();
  questionIndex++;
  if(questionIndex < questions.length) {
    setScreen("QuestionScreen");
    pickNextQuestion();
  }
  else {
    setScreen("EndScreen");
    setText("Score", "Score : " + score);
  }
});

onEvent("StartOver", "click", function( ) {
  clearOptions();
  questionIndex = 0;
  score = 0;
  
  setScreen("StartScreen");
});

onEvent("End", "click", function( ) {
  setScreen("EndScreen");
  setText("Score", "Score : " + score);
});

onEvent("End1", "click", function( ) {
  setScreen("EndScreen");
  setText("Score", "Score : " + score);
});































