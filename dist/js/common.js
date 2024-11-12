


document.getElementById('logoutButton').addEventListener('click', function () {
    // Clear session data
    sessionStorage.clear();
    window.location.replace("../html/sign.js")
});

const userdata = JSON.parse(sessionStorage.getItem('userdata'));
console.log(userdata)

const home = document.getElementById('home')
const quizzes1 = document.getElementById("quizzes")
const reports = document.getElementById("reports")
if (userdata.role == 'student') {
    home.classList.add('hidden')
    quizzes1.addEventListener('click', () => {
        const url = ""
        fetch(url).then(response => {
            if (!response.ok) {
                throw new console.error(`HTTP error! Status: ${response.status}`);

            }
            else {
                return response.json()
            }
        }
        ).then(
            data => {
                sessionStorage.setItem('quizzes', JSON.stringify(data))
                window.location.href("../html/quizList.html")
            }
        )
    })
}
else {
    reports.classList.add('hidden')
    showLoader()
    quizzes.addEventListener('click', () => {
        const url = `http://localhost:8080/api/v1/Quiz/getAllQuizByUserId?userId=${userId}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            }).then(
                data => {
                    sessionStorage.setItem('quizzes', JSON.stringify(data))
                    window.location.href("../html/quizList.html")
                }
            ).finally(()=>
            {
                hideLoader()
            })
    })
}


