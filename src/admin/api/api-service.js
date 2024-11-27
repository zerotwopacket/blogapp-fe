import { AuthorizationService } from '../../login/auth-service.js';

const API_BASE_URL = 'http://localhost:8080/blogs';

const authService = new AuthorizationService();

export const getBlogs = async () => {
  const response = await fetch(`${API_BASE_URL}`);
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export const getBlog = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export const createBlog = async (blog) => {
  const response = await fetch(`${API_BASE_URL}`, {
    method: 'POST',
    body: JSON.stringify(blog),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authService.getToken()}`
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export const updateBlog = async (blog) => {
  const response = await fetch(`${API_BASE_URL}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authService.getToken()}`
    },
    body: JSON.stringify(blog)
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
  const data = await response.json();

  return data;
}

export const deleteBlog = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${authService.getToken()}`
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
}
