document.getElementById('logoutButton').addEventListener('click', function() {
    // Clear session data
    sessionStorage.clear(); 
    history.replaceState(null, '', '../html/signIn.html'); 
});
