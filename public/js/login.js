const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.status===200) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/spotifyapi');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  // if we add name back in then replace line 32 with --> if (name && email && password)
    if (name && email && password) {
      if (password.length < 8) {
        alert('Password must be at least 8 characters')
      }
      const response = await fetch('/api/users', {
        method: 'POST',
         // if we add name back in then replace line 32 with --> body: JSON.stringify({ name, email, password }),
        body: JSON.stringify({ name, email, password }),

        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.status===200) {
        document.location.replace('/spotifyapi');
      } else {
        alert(response.statusText);
      }
    } else {
      alert('Please enter all fields correctly.')
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  