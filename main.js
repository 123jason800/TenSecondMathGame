// var randomNumber = function()
var gameForm = $('#game-form');
var gameButton = $('.game-button');
var gameInput = $('#game-input input');
var getUserInput = function() {

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


$(window).click(function() {
    gameInput.trigger('focus');
})


var generateRandomInt = function() {

}





// On Load

gameInput.trigger('focus');


