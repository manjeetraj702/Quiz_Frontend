function loadResults() {
    const userData = JSON.parse(sessionStorage.getItem('userdata'));
    const   userId =userData.userId;// Get the userId from sessionStorage or another source
    if (!userId) {
        alert('User is not logged in!');
        return;
    }

    // Show loader
    document.getElementById('loader').classList.remove('hidden');
    showLoader()
    fetch(`http://localhost:8080/api/v1/result/getResultsByUserId?userId=${userId}`, {
        method: 'GET',
        headers: {
            'accept': '*/*'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Hide loader
        document.getElementById('loader').classList.add('hidden');

        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
            const resultsList = document.getElementById('resultsList');
            resultsList.innerHTML = ''; // Clear previous results

            data.data.forEach(result => {
                const listItem = document.createElement('li');
                listItem.className = 'flex justify-between items-center bg-gray-800 p-3 rounded';
                listItem.innerHTML = `
                    <span class="font-medium">${result.questionTitle}</span>
                    <span class="${result.totalCorrectQuestions >= result.totalQuestions ? 'text-green-400' : 'text-red-400'}">Score: ${result.totalCorrectQuestions}/${result.totalQuestions}</span>
                `;
                resultsList.appendChild(listItem);
            });
        } else {
            alert('No results found!');
        }
    })
    .catch(error => {
        // Hide loader and display error
        document.getElementById('loader').classList.add('hidden');
        console.error('Error fetching results:', error);
        alert('Error fetching quiz results!');
    }).finally(()=>{
        hideLoader()
    });
}

// Call loadResults on page load
window.onload = loadResults;

// Function to go back to the home page
function goToHome() {
    window.location.href = "quizList.html"; // Change to your home page URL
}
//loader
function showLoader() {
    document.getElementById("loader").classList.remove("hidden");
  }
  
  // Function to hide loader
  function hideLoader() {
    document.getElementById("loader").classList.add("hidden");
  }