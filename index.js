// Create store, containing questions

const STORE = [
  {
    question: 'Goaltending occurs when',
    answers: [
      'A defensive player interferes with a shot while it\'s on the way down toward the basket.',
      'A defensive player interferes with a shot while it\'s on the way up toward the basket after having touched the backboard, while it\'s in the cylinder above the rim.',
      'When an offensive player interferes with a shot while it\'s in the cylinder above the rim.',
      'All the above.'
    ],
    correctAnswer: 'All the above.'
  },
  {
    question: 'A three second violation occurs when',
    answers: [
      'An offensive player takes longer than three seconds to reach within the three-point line. Anytime the ball hits the rim, the three seconds starts over again.',
      'A defensive player takes longer than three seconds to begin dribbling after the clock starts.',
      'An offensive player stays in the free throw lane, or key, for more than three seconds. Anytime they leave the key, or the ball hits the rim, the three seconds starts over again.',
      'All the above.'
    ],
    correctAnswer: 'An offensive player stays in the free throw lane, or key, for more than three seconds. Anytime they leave the key, or the ball hits the rim, the three seconds starts over again.'
  },
  {
    question: 'Double dribbling occurs when',
    answers: [
      'You begin dribbling, cross over, and then begin dribbling again.',
      'You begin dribbling, then stop dribbling, and then begin dribbling again.',
      'You begin dribbling towards the basket, stop moving towards the basket, and then start moving towards the basket again, without going back to the three-point line.',
      'When a player, upon stealing the ball, doesn\'t check the ball back in or go back to their own three-point line before approaching the basket.'
    ],
    correctAnswer: 'You begin dribbling, then stop dribbling, and then begin dribbling again.'
  },
  {
    question: 'An over-and-back violation occurs when',
    answers: [
      'When the offensive team performs a layup without swinging the ball around their back.',
      'When a defensive player screens an opponent and then suddenly move forward.',
      'When a defensive player, upon stepping out of bounds, steps back into the court.',
      'When the offensive team has gotten the ball over half court, and then takes the ball back into the defender\'s half court.'
    ],
    correctAnswer: 'When the offensive team has gotten the ball over half court, and then takes the ball back into the defender\'s half court.'
  },
  {
    question: 'Carrying occurs when',
    answers: [
      'A player who is dribbling the ball carries the ball in one hand for a long time, like double dribbling.',
      'One player jumps on top of another player to play defense.',
      'A defensive player places their arms around another player or "hugs" them.',
      'A player is suspected of using illegal enhancing drugs or "doping".'
    ],
    correctAnswer: 'A player who is dribbling the ball carries the ball in one hand for a long time, like double dribbling.'
  },
  {
    question: 'Traveling violation occurs when',
    answers: [
      'When a player moves with the ball without dribbling.',
      'When a player move beyond half court before the shot clock is at 10 seconds or under.',
      'When a coach steps into the basketball court while the ball is in play.',
      'When a player attempts a layup or dunk from beyond the free throw line.'
    ],
    correctAnswer: 'When a player moves with the ball without dribbling.'
  }
];

// Handle the beginning of the quiz.
// When start button is clicked, then remove sub title.
// Replace removed sub title with list of questions.

// Generate question html

function generateQuestion() {
  console.log("generateQuestion ran");
  // return "Question 1"
  if (questionNumber < STORE.length) {
    return `
      <div class="question-${questionNumber}">
        <h2>${STORE[questionNumber].question}</h2>
        <form>
          <fieldset>
            <label class="answerSelection">
              <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
              <span>${STORE[questionNumber].answers[0]}</span>
            </label>
            <label class="answerSelection">
              <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
              <span>${STORE[questionNumber].answers[1]}</span>
            </label>
            <label class="answerSelection">
              <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
              <span>${STORE[questionNumber].answers[2]}</span>
            </label>
            <label class="answerSelection">
              <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
              <span>${STORE[questionNumber].answers[3]}</span>
            </label>
            <button type="submit" class="submitButton">Submit</button>
          </fieldset>
        </form>
      </div>
    `;

  } else {
    $('.questionNumber').text(questionNumber);
    renderResults();
    return restartQuiz();
  }
}

function startQuiz() {
  console.log("startQuiz ran");
  $('.quizSubTitle').on('click', '.startButton', function (event) {
    console.log("Start button clicked");
    $('.quizSubTitle').remove();
    $('.quizQuestions').css('display', 'block');
    $('.questionNumber').text(1);
  });
}

// Handle user selected answer on submit
// Run user feedback

function handleSelectedAnswer() {
  console.log('handleSelectedAnswer ran');
  $('form').on('submit', function (event) {
    console.log('handleSelectedAnswer ran');
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      console.log('You are correct');
      // selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      console.log('You are incorrect');
      ifAnswerIsWrong();
    }
  });
}

// Show first question

function renderQuestion() {
  console.log('renderQuestion ran');
  $('.quizQuestions').html(generateQuestion());
}

// Instantiate question number

let questionNumber = 0;

// Increment question number

function incrementQuestionNumber() {
  console.log('incrementQuestionNumber ran');
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

// User feedback for correct answer

function ifAnswerIsCorrect() {
  console.log('ifAnswerIsCorrect ran');
  userAnswerFeedbackCorrect();
  updateScore();
}

// User feedback for incorrect answer

function ifAnswerIsWrong() {
  console.log('ifAnswerIsWrong ran');
  userAnswerFeedbackWrong();
}

// User feedback for correct answer
function userAnswerFeedbackCorrect() {
  console.log('userAnswerFeedbackCorrect ran');
  $('.quizQuestions').html(`
    <div class="correctAnswerFeedback">
      <p>You got it right!</p>
      <button type=button class="nextButton">Next</button>
    </div>
  `);
}

// User feedback for wrong answer
function userAnswerFeedbackWrong() {
  console.log('userAnswerFeedbackWrong');
  $('.quizQuestions').html(`
    <div class="wrongAnswerFeedback">
      <p><b>You got it wrong</b><br>the correct answer is <span>"${STORE[questionNumber].correctAnswer}"</span></p>
      <button type=button class="nextButton">Next</button>
    </div>
  `);
}

// Initialize score
let score = 0;

// Increment score function
function changeScore() {
  console.log('changeScore ran');
  score++;
}

// Update score text
function updateScore() {
  console.log('updateScore ran');
  changeScore();
  $('.score').text(score);
}

// Handle question submission
function renderNextQuestion() {
  console.log('renderNextQuestion ran');
  $('main').on('click', '.nextButton', function (event) {
    incrementQuestionNumber();
    renderQuestion();
    handleSelectedAnswer();
  });
}

// When the quiz is done, return results

function renderResults() {
  console.log('renderResults ran');
  if (score >= 6) {
    $('.quizQuestions').html(`
<div><h3>Give this person a ball! You're a hooper fo sho!</h3>
  <p>You got ${score} / 6</p>
  <button class="restartButton">Restart Quiz</button>
</div>
`);
  } else if (score < 8 && score >= 4) {
    $('.quizQuestions').html(`
<div><h3>Not bad baller. Not bad.</h3>
  <p>You got ${score} / 6</p>
  <button class="restartButton">Restart Quiz</button>
</div>
`);
  } else {
    $('.quizQuestions').html(`
<div><h3>Keep shooting playa, they'll start dropping some day (just not today)</h3>
  <p>You got ${score} / 6</p>
  <button class="restartButton">Restart Quiz</button>
</div>
`);
  }
}

// Allow user to restart quiz
function restartQuiz() {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

// Instantiate functions
function renderQuiz() {
  console.log('renderQuiz ran');
  startQuiz();
  renderQuestion();
  handleSelectedAnswer();
  renderNextQuestion();
}

$(renderQuiz);