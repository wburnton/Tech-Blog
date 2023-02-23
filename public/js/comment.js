async function commentHandler(event) {
    event.preventDefault();

     //find and associate variables with user assigned value given 
    //to comment_text
    const comment_text = document.querySelector("#comment-body").value;

    //get the post id from the url
    const post_id = document.querySelector(".add-comment").dataset.postid.slice(0,1);
//new comment created as a JSON object with post_id and comment_text
    console.log(post_id); 
    console.log(comment_text);
    const response = await fetch(`/api/comments`, {
        method: "POST",
        body: JSON.stringify({
            post_id,
            comment_text,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.reload();
        console.log(response);
      } else {
        alert("Failed to create comment");
      }

};

//listens for the submit button to be clicked to call commentFormHandler function
document.querySelector('.add-comment').addEventListener('submit', commentHandler);