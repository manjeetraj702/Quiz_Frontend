const userData = JSON.parse(sessionStorage.getItem('userdata'));


if (userData) {
  console.log(userData);

  const userRole = userData.role;
  const userId = userData.userId;
showLoader()
  if (userRole === 'admin') {
    const url = `http://localhost:8080/api/v1/Quiz/getAllQuizByUserId?userId=${userId}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data.data);
        // Separate quizzes into active and inactive
        const activeQuizzes = data.data.filter(quiz => quiz.active === true);
        const inactiveQuizzes = data.data.filter(quiz => quiz.active === false);

      

        // Update the HTML elements with the counts
        const totalQuizzesElem = document.querySelector('#admin .total-quizzes');
        const activeQuizzesElem = document.querySelector('#admin .active-quizzes');
        const inactiveQuizzesElem = document.querySelector('#admin .inactive-quizzes');

        if (totalQuizzesElem) totalQuizzesElem.textContent = data.data.length;
        if (activeQuizzesElem) activeQuizzesElem.textContent = activeQuizzes.length;
        if (inactiveQuizzesElem) inactiveQuizzesElem.textContent = inactiveQuizzes.length;

        totalQuizzesElem?.addEventListener('click', () => {
         
          sessionStorage.setItem('quizzes', JSON.stringify(data.data));
          console.log('Quizzes saved to sessionStorage');
          window.location.href = '../html/quizList.html';

        });

        activeQuizzesElem?.addEventListener('click', () => {
         
          sessionStorage.setItem('quizzes', JSON.stringify(activeQuizzes));
          console.log('Quizzes saved to sessionStorage');
          window.location.href = '../html/quizList.html';

        });

        inactiveQuizzesElem?.addEventListener('click', () => {
         
          sessionStorage.setItem('quizzes', JSON.stringify(inactiveQuizzes));
          console.log('Quizzes saved to sessionStorage');
          window.location.href = '../html/quizList.html';

        });
      })
      .catch(error => {
        console.error("Error fetching quiz data:", error);
      }).finally(()=>
      {
        hideLoader()
      });
  }
} else {
  console.log('User data not found in sessionStorage.');
}
//loader
function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
}

// Function to hide loader
function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
}