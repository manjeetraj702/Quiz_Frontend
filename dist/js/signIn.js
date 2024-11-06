document.getElementById('signInForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const phoneNumber = document.getElementById('phoneNumber').value;
    const password = document.getElementById('password').value;

    const requestBody = {
        phoneNumber: phoneNumber,
        password: password
    };

    fetch('http://localhost:8080/ai/v1/user/signIn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => {
            if (data.errorMessage) {
                alert(data.errorMessage); // Display error message from response
            } else {
                const toast = document.getElementById('toast');
                toast.classList.remove('hidden'); // Show toast
                setTimeout(() => {
                    toast.classList.add('hidden'); // Hide toast after 3 seconds
                }, 8000)
                // Display success message
                sessionStorage.setItem('userData', JSON.stringify(data)); // Store user data
                window.location.href = "../html/home.html";


            }
        })
        .catch(error => {
            alert('Error: ' + error.message); // Handle any network errors
        });
});