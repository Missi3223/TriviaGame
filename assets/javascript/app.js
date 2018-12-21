$(document).ready(function () {

    //defining events when clicking
    $("#restart").hide();
    $("#start").on("click",trivia.startGame); 
    $("#remaining-time").hide();
    $(document).on("click", "#option", trivia.answerCheck);
})     
//defining question variables

var trivia = {

    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId: '',

    // questions and answers
    questions: {
        q1: 'What was the name of the bald headed girl who Ross dated?',
        q2: 'Who put a turkey on their head?',
        q3: 'What did Phoebe find in her can of soda?',
        q4: 'How many time did Ross get divorced?',
    },
    choices: {
        q1: ['Gertrude', 'Becky', 'Bonnie', 'Roberta'],
        q2: ['Ross', 'Monica', 'Chandler', 'Joey'],
        q3: ['a toe', 'a pinky', 'a thumb', 'a pickle'],
        q4: ['3', '8', '11', '6'],
    },
    answers: {
        q1: 'Bonnie',
        q2: 'Monica',
        q3: 'a thumb',
        q4: '3',
    },

    //Starting the game functions
    startGame: function () {
        // restarting game results
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        // show game section
        $('#trivia_info').show();

        $('#results').html('');

        $('#timer').text(trivia.timer);

        // remove start button
        $('#start').hide();

        $('#remaining-time').show();

        // ask first question and sett up timer
        trivia.nextQuestion();
    },
    nextQuestion: function () {

        // 20 seconds each question
        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        // keep the timer consistant
        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        // Using the string
        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);

        // an array of all the user options for the current question
        var questionOptions = Object.values(trivia.choices)[trivia.currentSet];

        // creates all the trivia guess options in the html

        $.each(questionOptions, function (_index, key) {
            $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
        
        })
    },
    
    timerRunning:function () {

        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if (trivia.timer === 4) {
                $('#timer').addClass('last-seconds');
            }
        } else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        }
 // adds results of game (correct, incorrect, unanswered) to the page
        else if (trivia.currentSet === Object.values(trivia.questions).length){


            $('#results')
              .html('<h3>Thank you for playing!</h3>'+
              '<p>Correct: '+ trivia.correct +'</p>'+
              '<p>Incorrect: '+ trivia.incorrect +'</p>'+
              '<p>Unaswered: '+ trivia.unanswered +'</p>'+
              '<p>Please play again!</p>');
            
            // hide game sction
            $('#trivia_info').hide();
            
            // show start button to begin a new game
            $('#restart').show();

          }
        },
       
    
    // method to evaluate the option clicked
    
        answerCheck : function() {        
        // the answer to the current question being asked
        var currentAnswer = $("#options").on("click",trivia.answers)
        [trivia.currentSet];
      
         
        
        // if the text of the option picked matches the answer of the current question, increment correct
        if($(this).text() === currentAnswer){
          // turn button green for correct
          $(this).addClass('btn-success').removeClass('btn-info');
          
          trivia.correct++;
          clearInterval(trivia.timerId);
          resultId = setTimeout(trivia.guessResult, 1000);
          $('#results').html('<h3>Correct Answer!</h3>');
        }
        // else the user picked the wrong option, increment incorrect
        else{
          // turn button clicked red for incorrect
          $(currentOptions).addClass('btn-danger').removeClass('btn-info');
          
          trivia.incorrect++;
          clearInterval(trivia.timerId);
          resultId = setTimeout(trivia.guessResult, 1000);
          $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
          
        }
        
      },
      // method to remove previous question results and options
      guessResult : function(){
        
        // increment to next question set
        trivia.currentSet++;
        
        // remove the options and results
        $('.option').remove();
        $('#results h3').remove();
        
        // begin next question
        trivia.nextQuestion();
         
      }
    
    }

  
        
    
   
    
        
    
    
