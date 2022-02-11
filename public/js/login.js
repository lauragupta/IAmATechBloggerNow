//Get info from signUp form
const signupFormHandler = async (event) => {
    event.preventDefault();

  //Set Variables with signup info fields and verify content
    const name = document.querySelector('#signUpName').value.trim();
    const email = document.querySelector('#signUpEmail').value.trim();
    const password = document.querySelector('#signUpPassword').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/myblog');
      } else {
        alert(response.statusText);
      }
    }
};

//Event listener for SignUp
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
