export const addBlog = blog => ({
  type: 'blogs/blogAdded',
  payload: blog
});

export const updateBlog = blog => ({
  type: 'blogs/blogUpdated',
  payload: blog
});

export const deleteBlog = id => ({
  type: 'blogs/blogDeleted',
  payload: id
});
