// A function to edit a post
async function editFormHandler(event) {
    event.preventDefault();
  
    // get the post id from the url
    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];

      // Get the post title and post text from the form

    const name = document.querySelector('#post-name').value.trim();
    const description = document.querySelector('#post-desc').value.trim();

      // use the update route to update the post

      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/spotify');
      } else {
        alert('Failed to update post');
      }
    };

  
  document
    .querySelector('.edit-post-form')
    .addEventListener('submit', editFormHandler);