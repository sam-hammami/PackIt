document.getElementById('registrationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const userType = document.getElementById('userType').value;

  axios.post('http://localhost:3000/register', {
    email,
    password,
    userType
  })
  .then(response => {
    alert('Registered successfully');
  })
  .catch(error => {
    alert('Registration failed');
  });
});
