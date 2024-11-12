const userData = JSON.parse(sessionStorage.getItem('userdata'));
const adminId = userData.userId; 
function submitQuiz() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const duration = parseInt(document.getElementById('duration').value);
    console.log(userData)
    
    
    console.log(adminId)// Replace with actual admin ID

    // Send quiz data to the backend using fetch
    showLoader()
    fetch('http://localhost:8080/api/v1/Quiz/createQuiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': '*/*'
        },
        body: JSON.stringify({
            adminId: adminId,
            title: title,
            description: description,
            durationInMinutes: duration
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to create quiz');
        }
        return response.json();
    })
    .then(data => {
        console.log('Quiz created successfully:', data);

        // Store quiz details in sessionStorage (optional)
        sessionStorage.setItem('quizId', data.data.id);
       

        // Redirect to the add questions page
        window.location.href = 'addQuestions.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating quiz. Please try again.');
    }).finally(()=>
    {
        hideLoader()
    });
}
//loader
function showLoader() {
    document.getElementById("loader").classList.remove("hidden");
  }
  
  // Function to hide loader
  function hideLoader() {
    document.getElementById("loader").classList.add("hidden");
  }