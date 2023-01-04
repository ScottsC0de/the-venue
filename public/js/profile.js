const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#post-name').value.trim();
    const description = document.querySelector('#post-desc').value.trim();
  
    if (name && description) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/backstage');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/backstage');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  if (document.querySelector('.new-post-form')){
    document
      .querySelector('.new-post-form')
      .addEventListener('submit', newFormHandler);
  }
  
  if (document.querySelector('.post-list')){
    document
      .querySelector('.post-list')
      .addEventListener('click', delButtonHandler);
  }
  