const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#blogComment').value.trim();
  const blogId = document.querySelector('#blogComment').getAttribute('data-blog-id');

  if (comment) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment, blogId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }
};

  document.querySelector('.new-comment-form')
  .addEventListener('submit', commentFormHandler);