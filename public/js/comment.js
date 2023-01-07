const commentTextEl = document.querySelector("#comment");

postCommentHandler = async (event) => {
    event.preventDefault();
    const content = commentTextEl.value
    if (content.length > 0) {
        const post_id = document.location.pathname.split("/")[2];
        const response = await fetch("/api/comments/", {
            method: "POST",
            body: JSON.stringify({ content, post_id }),
            headers: { 
                "Content-Type": "application/json" 
            },
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert("Comment could not be saved to the post");
        }
    }
};

const delButtonHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('You can not delete another users comment!');
      }
    }
  };

document.querySelector('#postComment').addEventListener('click', postCommentHandler);

document.querySelector('.comment-list').addEventListener('click', delButtonHandler);