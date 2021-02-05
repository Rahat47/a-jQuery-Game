'use strict'
const buttonColors = ['red', 'blue', 'green', 'yellow']

//starting conditions
let gameStarted = false
let level = 0
let userClickedPattern = []
let gamePattern = []

//Keypress Event Handler to Start The game
$(document).keypress(function () {
    if (!gameStarted) {
        //ui change to show game started at level 0
        $('#level-title').text(`Level ${level}`)
        $('.instruction').addClass('hidden')
        nextSequence()
        gameStarted = true
    }
});


// Button CLick Handler
$('.btn').click(function () {
    //buttons only work if game is started
    if (gameStarted) {
        let userChosen = $(this).attr('id');
        userClickedPattern.push(userChosen)
        playSound(userChosen)
        animatePressed(userChosen)
        checkAnswer(userClickedPattern.length - 1)
    }

});

// Generate game sequence
function nextSequence() {
    //this resets the user clicked pattern each time this function is called
    userClickedPattern = []

    //increase level on each next sequence call
    level++
    $('#level-title').text(`Level ${level}`)

    //generate random number/sequence
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColors[randomNumber]

    //determines the game sequence
    gamePattern.push(randomChosenColour)

    //flash the sequence
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)
}

//play sound according to button
function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`)
    audio.play()
}
// animate the button pressed
function animatePressed(currentColor) {
    $(`#${currentColor}`).addClass('pressed');
    setTimeout(() => {
        $(`#${currentColor}`).removeClass('pressed');
    }, 100);
}

// check the answer
function checkAnswer(currentLevel) {
    //check the current answer
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        //If the user got the most recent answer right, then check if they have finished their sequence.
        if (userClickedPattern.length === gamePattern.length) {
            //sequence complete fire the next sequence
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    } else {
        //error msg
        playSound('wrong')
        $('body').addClass('game-over')
        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 200);
        $('#level-title').text('Game Over, Press Any Key to Restart')
        startOver()
    }
}
//resets all game values
function startOver() {
    level = 0
    gameStarted = false
    gamePattern = []
}