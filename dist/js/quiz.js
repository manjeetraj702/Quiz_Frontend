//loader
function showLoader() {
    document.getElementById("loader").classList.remove("hidden");
  }
  
  // Function to hide loader
  function hideLoader() {
    document.getElementById("loader").classList.add("hidden");
  }
  const quizId = sessionStorage.getItem('quiz_id'); 
   // Get quiz ID from sessionStorage

  let questions = [];  // Initialize empty array to hold questions from API
  let currentQuestion = 0;
  let totalQuestions = 0;
  let totalTime = 600; // Total quiz time in seconds
  let timeLeft = totalTime;
  let timerInterval;
  const userAnswers = [];  // Store user's answers

  async function fetchQuestions() {
    showLoader()
      try {
          const response = await fetch(`http://localhost:8080/api/v1/question/getQuestionsByQuizId?quizId=${quizId}`, {
              method: 'GET',
              headers: { 'Accept': '*/*' }
          });
          if (!response.ok) throw new Error('Network response was not ok');
          
          const data = await response.json();
          console.log('Fetched questions:', data);

          if (data.data && Array.isArray(data.data)) {
              questions = data.data;  // Populate questions with the fetched data
              totalQuestions = questions.length;  // Set total number of questions
              updateQuestion();  // Call to update the UI with the first question
          } else {
              console.error('Invalid response format:', data);
          }
      } catch (error) {
          console.error('Error fetching questions:', error);
      }finally{
        hideLoader()
      }
  }

  function startTimer() {
      timerInterval = setInterval(() => {
          timeLeft--;
          document.getElementById('time').innerText = timeLeft;
          if (timeLeft <= 0) {
              clearInterval(timerInterval);
              alert("Time's up! The quiz is finished.");
              calculateScore();
          }
      }, 1000);
  }

  function nextQuestion() {
      recordAnswer();
      if (currentQuestion < totalQuestions - 1) {
          currentQuestion++;
          updateQuestion();
      } else {
          calculateScore();
      }
  }

  function prevQuestion() {
      recordAnswer();
      if (currentQuestion > 0) {
          currentQuestion--;
          updateQuestion();
      }
  }

  function updateQuestion() {
      const question = questions[currentQuestion];
      document.getElementById('question-number').innerText = `Question ${currentQuestion + 1} of ${totalQuestions}`;
      document.getElementById('question-title').innerText = question.questionText;

      const optionsDiv = document.getElementById('question-options');
      optionsDiv.innerHTML = '';  // Clear previous options

      question.options.forEach((option, index) => {
          const optionLabel = document.createElement('label');
          optionLabel.classList.add('block', 'mb-2');
          optionLabel.innerHTML = `
              <input type="radio" name="answer" value="${index}" class="mr-2" ${userAnswers[currentQuestion] === index ? "checked" : ""}>
              ${String.fromCharCode(65 + index)}) ${option}
          `;
          optionsDiv.appendChild(optionLabel);
      });

      document.getElementById('time').innerText = timeLeft;

      const nextButton = document.getElementById('next-btn');
      if (currentQuestion === totalQuestions - 1) {
          nextButton.innerText = "Submit";
          nextButton.style.backgroundColor = "red";
          nextButton.onclick = function() {
              recordAnswer(); // Ensure the last answer is recorded
              calculateScore(); // Then submit the quiz
          };
      } else {
          nextButton.innerText = "Next";
          nextButton.onclick = nextQuestion; // Reset onclick to next question
      }
  }

  function recordAnswer() {
      const selectedOption = document.querySelector('input[name="answer"]:checked');
      if (selectedOption) {
          userAnswers[currentQuestion] = parseInt(selectedOption.value);
          console.log(`Recorded answer for Question ${currentQuestion + 1}: Option ${selectedOption.value}`);
      }
  }

  function calculateScore() {
      let score = 0;
      questions.forEach((question, index) => {
          if (userAnswers[index] === question.correctOption) {
              score++;
          }
      });

      const resultData = {
          score: score,
          questions: questions,
          userAnswers: userAnswers
      };
      sessionStorage.setItem("quizResults", JSON.stringify(resultData));
      window.location.href = "result.html"; // Redirect to the results page
  }

  window.onload = function() {
      fetchQuestions();  // Fetch questions on page load
      startTimer();  // Start timer
  };