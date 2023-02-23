const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#post-name").value;
  
    const post_content = document.querySelector("#post-desc").value;
  
   
      const response = await fetch(`/api/posts`, {
        method: "POST",
        body: JSON.stringify({ title, post_content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to create post");
      }
    
};
  
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute("data-id")) {
      const id = event.target.getAttribute("data-id");
  
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to delete post");
      }
    }};
  
  document.querySelector(".new-post-form").addEventListener("submit", newFormHandler);
  
  document.querySelector("#del-butt").addEventListener("click", delButtonHandler);
  