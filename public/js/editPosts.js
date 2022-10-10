async function editPost(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="postTitle"]').value.trim();
    const post_text = document
      .querySelector('input[name="postText"]')
      .value.trim();
    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        post_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      document.location.replace("/profile/");
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector(".editPost").addEventListener("submit", editPost);
  