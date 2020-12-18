var gameForm = $('#game-form');
var gameButton = $('.game-button');
var gameInput = $('#game-input input');
var gameTimerText = $('.game-timer-text');
var gameLimitInput = $('#limit-input');
var limitValues = $('.limit-values');
var gameOutput = $('#game-output');
var highScore = 0;

var operationSymbols = {
    "add": " + ",
    "subtract" : " - ",
    "multiply": " X ",
    "divide": " / "
}

var countDown = function(seconds) {
    var timer = setInterval(function(){
        seconds--;
        gameTimerText.text(seconds);
        if (seconds === 0) {
            clearInterval(timer);
        }
    },1000);   
}







var clearGameInput = function() {
    gameInput.val('');
}


// Generate Random Int
var generateRandomInt = function(max) {
    return Math.floor(Math.random() * (max-1) + 1);
}


var getRandomNumbers = function(max, operation) {
    if (operation !== "divide") {
        return [Math.floor(Math.random() * (max-1) + 1),Math.floor(Math.random() * (max-1) + 1)];
    }
    var dividend = Math.floor(Math.random() * (max-1) + 1);
    var divisor = Math.floor(Math.random() * (max-1) + 1);
    while (dividend % divisor !== 0 ) {
        divisor = Math.floor(Math.random() * (max-1) + 1);
    }
    return [dividend,divisor];   
}




var displayProblem = function(problem,op) {
    $('#place-one').text(problem[0]);
    $('#place-two').text(problem[1]);
    $('#operation').text(operationSymbols[op]);
}

var getOperation = function() {
    var operation = "";
    $('input[name=operations]').each(function(){
        if ($(this).is(':checked')) {
            operation =  $(this).val();
        }
    })
    return operation;
}

var getProblem = function() {
    var problem = this.operation === "divide"?getRandomNumbers(limitValues.text(),true):getRandomNumbers(limitValues.text());
    var [placeOne,placeTwo] = problem;
    if(this.operation === "subtract") {
        placeOne = Math.max(...problem);
        placeTwo = Math.min(...problem);
    }
    return [placeOne,placeTwo];
}

var getAnswer = function(numArray ,operation) {
    var answer;
    
    switch(operation) {
        case "add":
            answer = numArray[0] + numArray[1];
            break;
        case "subtract":
            answer = Math.max(...numArray) - Math.min(...numArray);
            break;
        case "multiply":
            answer = numArray[0] * numArray[1];
            break;
        default:
            answer = numArray[0] / numArray[1];
            break;
    }
   
    return answer;


}

function Round(problem,operation,max) {
    this.operation = operation;
    this.currentProblem = problem;
    this.score = 0;
    this.seconds = 10;
    this.max = max;
    this.userInput = '';
 

    this.checkAnswer = function() {

       if (parseInt(this.userInput) === getAnswer(this.currentProblem,this.operation)) {
           this.seconds++;
           this.score++;
           gameTimerText.text(this.seconds);
           return true;
       }
       return false;
    }

    this.getNewProblem = function() {
        this.currentProblem = getRandomNumbers(this.max,this.operation);
        displayProblem(this.currentProblem,this.operation);
    }
    
    this.getUserInput = function() {
        gameInput.unbind();
        var that = this;
        gameInput.on('input',function() {
            that.userInput = $(this).val();
            console.log(that.userInput);
            if (that.checkAnswer()) {
                that.getNewProblem();
                that.resetUserInput();
            }
            if (that.seconds === 0) {
                $(this).unbind();
            }
        });

    }

    this.resetUserInput = function() {
        this.userInput = '';
        clearGameInput();
    }

    this.startRound = function() {
        var that = this;
        var timer = setInterval(function() {
            that.seconds--;
            gameTimerText.text(that.seconds);
            if (that.seconds === 0) {
                clearInterval(timer);
                that.endGame();
            }
        },1000);   
        displayProblem(this.currentProblem,this.operation);
        this.getUserInput();
    }

    this.endGame = function(){
        console.log("Your score is :" +  this.score);
    }

}


    
// Ensure button gets checked for the radio input
gameButton.on('click',function(){
    var current = $(this).children('input');
    if (!current.is(':checked')) {
        current.prop("checked", true);
        gameForm.find('.active').toggleClass('active');
        $(this).toggleClass('active');     

    }
});

// Ensures input is seen by user
$(window).click(function() {
    gameInput.trigger('focus');
})

gameLimitInput.on('input',function() {
    var percent = Math.floor((parseInt($(this).val())/50) * 100);
    limitValues.text($(this).val());
    $(this).css("background",`linear-gradient(90deg, rgba(230,145,233,1) 0%, rgba(29,29,155,1) ${percent}%)`);
});



var gameStart = function() {
    displayProblem(2,3,"add");
    var round = new Round([2,3],"add",35);
    gameInput.on('keypress',function() {
        round.startRound();
    });
}

gameStart();
