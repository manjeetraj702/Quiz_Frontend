document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userName = document.getElementById('userName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const requestBody = {
        userName: userName,
        phoneNumber: phoneNumber,
        password: password,
        role: role
    };
    showLoader()
    fetch('http://localhost:8080/ai/v1/user/signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        if (data.errorMessage) {
            alert(data.errorMessage); 
        } else {
            alert("User created successfully!"); 
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    }).finally(()=>{
        hideLoader()
    });
});
//loader
function showLoader() {
    document.getElementById("loader").classList.remove("hidden");
  }
  
  // Function to hide loader
  function hideLoader() {
    document.getElementById("loader").classList.add("hidden");
  }