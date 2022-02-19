const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#updateBlogTitle').value.trim();
  const content = document.querySelector('#updateBlogContent').value.trim();
  const blogId = document.querySelector('#updateBlogContent').getAttribute('data-blog-id');

  if (title && content) {
    const response = await fetch(`/api/blogs/${blogId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content, blogId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update blog');
    }
  }
};


  document.querySelector('.update-blog-form')
  .addEventListener('submit', updateFormHandler);