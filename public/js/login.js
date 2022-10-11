
async function signupForm(event) {
    event.preventDefault();
    const username = document.querySelector("#usernameSign").value.trim();
    const email = document.querySelector("#emailSign").value.trim();
    const password = document.querySelector("#passwordSign").value.trim();
    //good to add conditionals on client side POST. It assists with security.
  
    
  
    if (username && email && password) {
      const response = await fetch("/api/users", {
        method: "post",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log("Success!");
        document.location.replace("profile");
      } else {
        alert(response.statusText);
      }
    }
  }
  
  async function loginForm(event) {
    event.preventDefault();
  
    const email = document.querySelector("#emailLogin").value.trim();
    const password = document.querySelector("#passwordLogin").value.trim();
  
    if (email && password) {
      const response = await fetch("/api/users/registration", {
        method: "post",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log("success");
        document.location.replace("profile");
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector("#signUpForm").addEventListener("submit", signupForm);
  document.querySelector("#loginForm").addEventListener("submit", loginForm);
  