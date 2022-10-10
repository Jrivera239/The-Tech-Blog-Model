async function addPost(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="title"]').value.trim();
    const post_text = document
      .querySelector('input[name="post_text"]')
      .value.trim();
  
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        post_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      console.log(response);
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector(".addPost").addEventListener("submit", addPost);
  