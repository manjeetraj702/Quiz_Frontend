// Retrieve and parse 'userdata' from sessionStorage
const userDataRaw = sessionStorage.getItem('userdata');
console.log("Raw userdata:", userDataRaw); // Debugging: check what's stored

let userData = null;
try {
    userData = JSON.parse(userDataRaw);
} catch (error) {
    console.error("Error parsing userdata:", error);
}

let adminId;
if (!userData || !userData.userId) {
    console.error("No valid user data found in sessionStorage.");
    alert("User data is missing or corrupted. Please log in again.");
} else {
    adminId = userData.userId;
}

// Retrieve and parse 'quizId' from sessionStorage
let quizId = sessionStorage.getItem('quizId');
if (!quizId) {
    console.error("Quiz ID not found in sessionStorage.");
    alert("Quiz ID is missing. Please try again.");
}

function submitQuestions() {
    const questionsContainer = document.getElementById('questions-container');
    const questions = [];

    // Gather all questions from the form
    for (let i = 0; i < questionsContainer.children.length; i++) {
        const questionDiv = questionsContainer.children[i];
        const questionText = questionDiv.querySelector(`input[name="questions[${i}][text]"]`).value;
        const options = [
            questionDiv.querySelector(`input[name="questions[${i}][options][0]"]`).value,
            questionDiv.querySelector(`input[name="questions[${i}][options][1]"]`).value,
            questionDiv.querySelector(`input[name="questions[${i}][options][2]"]`).value,
            questionDiv.querySelector(`input[name="questions[${i}][options][3]"]`).value
        ];
        const correctOption = parseInt(questionDiv.querySelector(`select[name="questions[${i}][correct_option]"]`).value);

        questions.push({
            adminId: adminId,
            quizId: quizId,
            questionText: questionText,
            options: options,
            correctOption: correctOption
        });
    }

    // Show loading indicator (optional)
    document.getElementById('loading-indicator').style.display = 'block';

    // Helper function to send a single question
   async function sendQuestion(question) {
        showLoader()
        return fetch('http://localhost:8080/api/v1/question/createQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            body: JSON.stringify(question)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to submit question');
            }
            return response.json();
        });
    }

    // Send each question individually
    const promises = questions.map(sendQuestion);

    Promise.all(promises)
        .then(results => {
            console.log('All questions submitted successfully:', results);
            alert('All questions submitted successfully!');
        })
        .catch(error => {
            console.error('Error submitting questions:', error);
            alert('Error submitting questions. Please try again.');
        })
        .finally(() => {
            hideLoader()
            // Hide loading indicator
            document.getElementById('loading-indicator').style.display = 'none';
        });
}

function addQuestion() {
    const questionsContainer = document.getElementById('questions-container');
    const questionCount = questionsContainer.children.length;

    const questionDiv = document.createElement('div');
    questionDiv.className = "mb-6 border-2 border-blue-400 rounded-md p-4 bg-gray-800 relative";

    questionDiv.innerHTML = `
        <label for="question_${questionCount}" class="block text-sm font-medium text-gray-300">Question ${questionCount + 1}</label>
        <input type="text" id="question_${questionCount}" name="questions[${questionCount}][text]" required 
               class="mt-1 block w-full border-2 border-blue-400 rounded-md p-2 bg-gray-700 text-gray-200 focus:ring focus:ring-blue-500" 
               placeholder="Enter question text">
        
        <div class="mt-2">
            <label class="block text-sm font-medium text-gray-300">Options</label>
            <input type="text" name="questions[${questionCount}][options][0]" required 
                   class="mt-1 block w-full border-2 border-blue-400 rounded-md p-2 bg-gray-700 text-gray-200 focus:ring focus:ring-blue-500 mb-2" 
                   placeholder="Option 1">
            <input type="text" name="questions[${questionCount}][options][1]" required 
                   class="mt-1 block w-full border-2 border-blue-400 rounded-md p-2 bg-gray-700 text-gray-200 focus:ring focus:ring-blue-500 mb-2" 
                   placeholder="Option 2">
            <input type="text" name="questions[${questionCount}][options][2]" 
                   class="mt-1 block w-full border-2 border-blue-400 rounded-md p-2 bg-gray-700 text-gray-200 focus:ring focus:ring-blue-500 mb-2" 
                   placeholder="Option 3">
            <input type="text" name="questions[${questionCount}][options][3]" 
                   class="mt-1 block w-full border-2 border-blue-400 rounded-md p-2 bg-gray-700 text-gray-200 focus:ring focus:ring-blue-500 mb-2" 
                   placeholder="Option 4">
        </div>
        <label for="correct_option_${questionCount}" class="block text-sm font-medium text-gray-300">Correct Option</label>
        <select name="questions[${questionCount}][correct_option]" id="correct_option_${questionCount}" required 
                class="mt-1 block w-full border-2 border-blue-400 rounded-md p-2 bg-gray-700 text-gray-200 focus:ring focus:ring-blue-500 mb-4">
            <option value="" disabled selected>Select the correct option</option>
            <option value="0">Option 1</option>
            <option value="1">Option 2</option>
            <option value="2">Option 3</option>
            <option value="3">Option 4</option>
        </select>
        
        <button type="button" onclick="removeQuestion(this)" 
                class="w-full bg-red-500 text-white rounded-md py-2 hover:bg-red-600">
            Remove Question
        </button>
    `;
    questionsContainer.appendChild(questionDiv);
}

function removeQuestion(button) {
    const questionDiv = button.parentElement;
    questionDiv.remove();
}

// Optional loading indicator (HTML)
document.body.innerHTML += `<div id="loading-indicator" style="display: none;">Submitting...</div>`;
//loader
function showLoader() {
    document.getElementById("loader").classList.remove("hidden");
  }
  
  // Function to hide loader
  function hideLoader() {
    document.getElementById("loader").classList.add("hidden");
  }