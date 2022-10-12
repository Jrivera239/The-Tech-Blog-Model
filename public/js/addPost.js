async function addPost(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="title"]').value;
    const post_text = document.querySelector('input[name="post_text"]').value();
  
    const response = await fetch(`/api/post`, {
      method: "POST",
      body: JSON.stringify({
        title,
        post_text,
      }
      ),
      headers: {
        "Content-Type": "application/json",
      },
    }
    );
  
    if (response.ok) {
      document.location.replace('/dashboard');
  } else 
  {
      alert(response.statusText);
  }
};
  
  document.querySelector(".addPost").addEventListener("submit", addPost);
  