function onlyDigits(event) {
  let charCode = event.which ? event.which : event.keyCode;
  // Allow control keys (backspace, delete, arrow keys, etc.)
  if (
      charCode == 8 || // Backspace
      charCode == 127 || // Delete
      (charCode >= 37 && charCode <= 40) // Arrow keys
  ) {
      return true;
  }
  // Allow only numbers (0-9)
  if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
  }

  return true;
}

var beginBtn = document.getElementById('beginBtn'),
    resetBtn = document.getElementById('resetBtn'),
    trialText = document.getElementById('trialText'),
    heroText = document.getElementById('heroText'),
    bottomText = document.getElementById('bottomText'),
    inputText = document.getElementById('inputText'),
    checkBtn = document.getElementById('checkBtn');

beginBtn.addEventListener('click', function () {
    document.getElementsByClassName('container1')[0].style.display = "none";
    document.getElementsByClassName('container2')[0].style.display = "flex";
});

var magicNumber = Math.ceil(Math.random() * 100);
var trialsRem = 3;
var messagesBig = ["Guess a Magic Number", "Got It!!", "You Lost!!"];
var messagesSmall = ["Enter a number between 1-100", "Congratulations, you won", "Oops, you failed, ", "Too high! Calm down", "Too low! Go higher"];
var gameEnds = false;

checkBtn.addEventListener('click', function (){
    let guess = inputText.value;
    inputText.style.border = "none";
    if(gameEnds){
        gameEnd();
    }else{
        if(checkInput()){
            if(guess == magicNumber){
                heroText.innerHTML = messagesBig[1];
                bottomText.innerHTML = messagesSmall[1];
                checkBtn.querySelector('span').innerText = "Restart";
                gameEnds = true;
            }else {
                trialsRem = trialsRem - 1;
                if(trialsRem == 1){
                    let rangeText = getRange(magicNumber);
                    trialText.innerHTML = trialsRem+" trial";
                    if(guess < magicNumber)
                        bottomText.innerHTML = "Still low. "+rangeText;
                    else bottomText.innerHTML = "Still high. "+rangeText;
                } else if(trialsRem > 1){
                    trialText.innerHTML = trialsRem+" trials";
                    if(guess < magicNumber){
                        bottomText.innerHTML = messagesSmall[4];
                    }else if(guess > magicNumber){
                        bottomText.innerHTML = messagesSmall[3];
                    }
                } else {
                    heroText.innerHTML = messagesBig[2];
                    bottomText.innerHTML = messagesSmall[2]+"magic number was "+magicNumber;
                    checkBtn.querySelector('span').innerText = "Try again";
                    gameEnds = true;
                }
            }
        }else{
            inputText.style.border = "1px solid #9B52FD";
        }
    }
});

function gameEnd(){
    trialsRem = 3;
    trialText.innerHTML = trialsRem+" trials"
    checkBtn.querySelector('span').innerText = "Check";
    inputText.value = '';
    heroText.innerHTML = messagesBig[0];
    bottomText.innerHTML = messagesSmall[0];
    magicNumber = Math.ceil(Math.random() * 100);
    gameEnds = false;
}

function getRange(number){
    var isEven = (number % 2) === 0 ? "even" : "odd";
    switch(true){
        case (number < 21):
            return "Hint: an "+isEven+" number between 1 and 20";
        case (number < 41):
            return "Hint: an "+isEven+" number between 21 and 40";
        case (number < 61):
                return "Hint: an "+isEven+" number between 41 and 60";
        case (number < 81):
                return "Hint: an "+isEven+" number between 61 and 80";
        default:
            return "Hint: an "+isEven+" number between 76 and 100";
    }
}

function checkInput(){
    if(inputText.value > 0 && inputText.value < 101)
        return true;
    else return false;
}

resetBtn.addEventListener('click', function(){
    gameEnd();
});

inputText.addEventListener('focus', function(){
    inputText.style.border = "none";
});
inputText.addEventListener('keypress', function(){
    inputText.style.border = "none";
});