document.getElementById('signInForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const phoneNumber = document.getElementById('phoneNumber').value;
    const password = document.getElementById('password').value;

    const requestBody = {
        phoneNumber: phoneNumber,
        password: password
    };
    showLoader()

    fetch('http://localhost:8080/ai/v1/user/signIn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data1 => {
            if (data1.errorMessage) {
                alert(data1.errorMessage); // Display error message from response
            } else {
                sessionStorage.setItem('userdata', JSON.stringify(data1.data)); 
    
                // Check if the toast element exists before trying to manipulate it
                const toast = document.getElementById('toast');
                if (toast) {
                    // Store user data in sessionStorage
                    console.log(data1.data);

                    toast.classList.remove('hidden'); // Show toast
                    setTimeout(() => {
                        toast.classList.add('hidden'); // Hide toast after 8 seconds
                    }, 8000);
                }

                // Redirect to home page
               if(data1.data.role === "admin")
               {
               
                window.location.replace("../html/home.html");
               }
               else 
               {
                showLoader()
                fetch('http://localhost:8080/api/v1/Quiz/getAllActiveQuiz', {
                    method: 'GET',
                    headers: {
                        'accept': '*/*'
                    }
                })
                .then(response => {
                    // Check if the response is successful (status 200)
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Log the active quizzes
                    console.log('Active quizzes:', data.data);
                
                    // Ensure that 'data.data' is an array before saving it
                    if (Array.isArray(data.data)) {
                        // Save the quizzes in sessionStorage under the key 'quizzes'
                        
                
                        sessionStorage.setItem('quizzes', JSON.stringify(data.data));
                        console.log('Quizzes saved to sessionStorage');
                
                        // Optionally, redirect to another page (uncomment if needed)
             
                        window.location.replace('../html/quizList.html');
                    } else {
                        console.error('No quizzes found or invalid response structure');
                        alert('No active quizzes found or invalid data format.');
                    }
                })
                .catch(error => {
                    // Log any errors that occur during the fetch request
                    console.error('Error fetching active quizzes:', error);
                    alert('Error fetching active quizzes. Please try again.');
                }).finally(()=>{
                    hideLoader()
                });
                
                
               }
            }
        })
        .catch(error => {
            alert('Error: ' + error.message); // Handle any network errors
        }).finally(()=>{
            hideLoader()
        });
});
//loader
function showLoader() {
    const loaderElement = document.getElementById("loader");
    if (loaderElement && loaderElement.classList.contains("hidden")) {
        console.log("Showing loader");
        loaderElement.classList.remove("hidden");
    } else {
        console.log("Loader is already visible");
    }
}

function hideLoader() {
    const loaderElement = document.getElementById("loader");
    if (loaderElement && !loaderElement.classList.contains("hidden")) {
        console.log("Hiding loader");
        loaderElement.classList.add("hidden");
    } else {
        console.log("Loader is already hidden");
    }
}
