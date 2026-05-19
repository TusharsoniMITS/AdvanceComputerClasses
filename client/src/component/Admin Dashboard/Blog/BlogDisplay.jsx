import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

function BlogDisplay() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/getAllBlog');
      setPosts(response.data.allBlog || []); // Ensure it's an array
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
      setPosts([]); // Prevent crashes
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      toast.error('Invalid post ID');
      return;
    }

    try {
      await axios.delete(`/api/deleteBlog/${id}`);
      toast.success('Post deleted successfully!');
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error('Error deleting post:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'An error occurred while deleting');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post._id || post.id} className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">{post.name || 'No Title'}</h2>
              <p className="text-gray-600">Qualification: {post.qualification || 'N/A'}</p>
              <p className="text-gray-600">Important Dates: {post.importantDates || 'N/A'}</p>
              
              {post.downloadLink && (
                <a
                  href={post.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Download Link
                </a>
              )}
              <br />

              {post.applyForm && (
                <a
                  href={post.applyForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:underline"
                >
                  Apply Here
                </a>
              )}
              <br />

              <button
                onClick={() => handleDelete(post._id || post.id)}
                className="bg-red-500 text-white p-2 rounded mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogDisplay;
