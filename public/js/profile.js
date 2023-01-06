// const newPostHandler = async (event) => {
//     event.preventDefault();
  
//     const name = document.querySelector('#post-name').value.trim();
//     const description = document.querySelector('#post-desc').value.trim();
//     let artists_name = data.artists.items[0].name;
//     let album_image = data.artists.items[0].images[0].url;
   
  
//     if (name && description ) {
//       const response = await fetch(`/api/posts`, {
//         method: 'POST',
//         body: JSON.stringify({ name, description, artists_name, album_image }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (response.ok) {
//         document.location.replace('/');
//       } else {
//         alert('Failed to create post');
//       }
//     }
//   };

  
//   const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');
  
//       const response = await fetch(`/api/posts/${id}`, {
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         document.location.replace('/spotify');
//       } else {
//         alert('Failed to delete post');
//       }
//     }
//   };
//   if (document.querySelector('.new-post-form')){
//     document
//       .querySelector('.new-post-form')
//       .addEventListener('submit', newPostHandler);
//   }
  
//   if (document.querySelector('.post-list')){
//     document
//       .querySelector('.post-list')
//       .addEventListener('click', delButtonHandler);
//   }
  