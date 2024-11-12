function loadResults() {
    const resultData = JSON.parse(sessionStorage.getItem("quizResults"));
    const questions = resultData.questions;
    const userAnswers = resultData.userAnswers;
    const score = resultData.score;

    const userData = JSON.parse(sessionStorage.getItem('userdata'));
    const quizTitle = sessionStorage.getItem('quiz_title'); 
    const quizId = sessionStorage.getItem('quiz_id'); 
    // Display score
    const userId = userData.userId;
    document.getElementById("score").textContent = `${score} / ${questions.length}`;
    
    // Display feedback message based on score
    const feedback = document.getElementById("feedback");
    if (score > questions.length / 2) {
        feedback.textContent = "Great job! You scored above average.";
    } else {
        feedback.textContent = "Keep practicing! You'll improve with time.";
    }

    // Display answers summary
    const summaryList = document.getElementById("answers-summary");
    summaryList.innerHTML = ""; // Clear previous content if any

    questions.forEach((question, index) => {
        const listItem = document.createElement("li");
        listItem.className = "md:flex md:justify-between mb-2";

        // Question text
        const questionText = document.createElement("div");
        questionText.textContent = `Question ${index + 1}: ${question.questionText}`;
        listItem.appendChild(questionText);

        // Answer correctness and correct answer display
        const answerStatus = document.createElement("div");
        if (userAnswers[index] === question.correctOption) {
            answerStatus.textContent = "Correct";
            answerStatus.className = "text-green-400";
        } else {
            answerStatus.textContent = `Incorrect (Correct answer: ${question.options[question.correctOption]})`;
            answerStatus.className = "text-red-400";
        }
        listItem.appendChild(answerStatus);

        summaryList.appendChild(listItem);
    });

    // Send POST request to save the result
    const requestBody = {
        studentId: userId, // Assuming studentId is stored in resultData
        totalQuestions: questions.length,
        totalCorrectQuestions: score ,
        questionTitle : quizTitle,
        quizId : quizId
    };
    showLoader()

    fetch('http://localhost:8080/api/v1/result/createResult', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Result saved successfully:", data);
    })
    .catch(error => {
        console.error("Error saving result:", error);
    }).finally(()=>{
        hideLoader()
    });
}

// Function to restart the quiz
function restartQuiz() {
    window.location.href = "../html/quiz.html"; // Change to your quiz page URL
}

// Function to go to the home page
function goHome() {
    window.location.href = "../html/quizList.html"; // Change to your home page URL
}

// Load results on page load
window.onload = loadResults;
//loader
function showLoader() {
    document.getElementById("loader").classList.remove("hidden");
  }
  
  // Function to hide loader
  function hideLoader() {
    document.getElementById("loader").classList.add("hidden");
  }