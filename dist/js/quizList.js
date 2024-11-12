const userData = JSON.parse(sessionStorage.getItem('userdata'));
const role = userData.role;
const userId = userData.userId
const createButton = document.getElementById('create-quiz');

// Hide create button for students
if (role === "student") {
    createButton.classList.add('hidden');
}

// Parse quizzes from sessionStorage and access the correct array
let quizzesData = JSON.parse(sessionStorage.getItem('quizzes') || '{}');
let quizzes = quizzesData || [];
console.log(quizzesData) // Default to empty array if activeQuizzes is missing

function renderQuizzes() {
    const tableBody = document.getElementById("quizTableBody");
    tableBody.innerHTML = ""; 

    quizzes.forEach(quiz => {
        // Create the <tr> element for the row
        const row = document.createElement("tr");
        row.className = "border-b border-gray-700 hover:bg-gray-800 transition duration-200";
    
        // Create the <td> elements for each piece of data
        const titleCell = document.createElement('td');
        titleCell.classList.add('py-3', 'px-4');
        titleCell.textContent = quiz.title; // Set the title
    
        const descriptionCell = document.createElement('td');
        descriptionCell.classList.add('py-3', 'px-4');
        descriptionCell.textContent = quiz.description; // Set the description
    
        const durationCell = document.createElement('td');
        durationCell.classList.add('py-3', 'px-4');
        durationCell.textContent = quiz.durationInMinutes; // Set the duration
    
        // Create the action buttons (Play/Edit/Delete)
        const actionCell = document.createElement('td');
        actionCell.classList.add('py-3', 'px-4', 'text-center','flex');
    
        if (role === "student") {
            const playButton = document.createElement('a');
            playButton.classList.add('bg-green-500', 'text-white', 'py-1', 'px-2', 'rounded', 'hover:bg-green-600', 'transition', 'duration-200');
            playButton.textContent = 'Play';
            playButton.onclick = () => quizPlay(quiz.id,quiz.title); // Set the onclick event
    
            actionCell.appendChild(playButton); // Append the Play button to the action cell
        } else {
            const editButton = document.createElement('a');
            editButton.classList.add('bg-yellow-400', 'text-gray-900', 'py-1', 'px-2', 'rounded', 'hover:bg-yellow-500', 'transition', 'duration-200');
            editButton.textContent = 'Edit';
            editButton.href = `/edit-quiz/${quiz.id}`; // Set the link to the edit page
    
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('bg-red-600', 'text-white', 'py-1', 'px-2', 'rounded', 'hover:bg-red-700', 'ml-2', 'transition', 'duration-200');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteQuiz(quiz.id); // Set the onclick event
    
            actionCell.appendChild(editButton); // Append the Edit button
            actionCell.appendChild(deleteButton); // Append the Delete button
        }
    
        // Append the <td> elements to the <tr> row
        row.appendChild(titleCell);
        row.appendChild(descriptionCell);
        row.appendChild(durationCell);
        row.appendChild(actionCell);
    
        // Finally, append the <tr> to the table (assuming you have a <tbody> with id 'tableBody')
        const tableBody = document.getElementById('quizTableBody');
        tableBody.appendChild(row);
    });
    
}

function quizPlay(quiz_id,quiz_title) {
    console.log(quiz_id)
    sessionStorage.setItem('quiz_id', quiz_id);
    sessionStorage.setItem('quiz_title', quiz_title);
    window.location.href = 'quiz.html';
}

function deleteQuiz( quizId) {
    // Show confirmation prompt before deletion
    if (!confirm("Are you sure you want to delete this quiz?")) return;
    showLoader()
    // Make the DELETE request
    fetch(`http://localhost:8080/api/v1/Quiz/deleteQuiz?userId=${userId}&quizId=${quizId}`, {
        method: 'DELETE',
        headers: {
            'accept': '*/*'
        }
    })
    .then(response => {
        if (response.ok) {
            alert("Quiz deleted successfully.");
            // Optionally, refresh the page or remove the deleted quiz from the UI here
        } else {
            return response.json().then(errorData => {
                throw new Error(errorData.errorMessage || "Failed to delete the quiz.");
            });
        }
    })
    .catch(error => {
        console.error("Error deleting quiz:", error);
        alert(error.message || "An error occurred while deleting the quiz.");
    }).finally(()=>
    {
        hideLoader()
    });
    renderQuizzes();
}


// Call renderQuizzes on page load
renderQuizzes();
//loader
function showLoader() {
    document.getElementById("loader").classList.remove("hidden");
  }
  
  // Function to hide loader
  function hideLoader() {
    document.getElementById("loader").classList.add("hidden");
  }