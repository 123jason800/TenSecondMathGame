var gameForm = $('#game-form');
var gameButton = $('.game-button');
var gameInput = $('#game-input input');
var gameTimerText = $('.game-timer-text');
var gameLimitInput = $('#limit-input');
var limitValues = $('.limit-values');
var countDown = function(seconds) {
    var timer = setInterval(function(){
        seconds--;
        gameTimerText.text(seconds);
        if (seconds === 0) {
            clearInterval(timer);
        }
    },1000);   
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

var generateRandomInt = function() {

}






// On Load




