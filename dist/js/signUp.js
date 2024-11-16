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
