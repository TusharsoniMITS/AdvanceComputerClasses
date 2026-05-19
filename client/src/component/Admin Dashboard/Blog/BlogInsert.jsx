import React, { useState } from 'react';
import toast from 'react-hot-toast';

function BlogInsert() {
  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    downloadLink: '',
    applyForm: '',
    importantDates: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/insertBlog', { // Replace with actual API
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast.success('Post inserted successfully!');
        setFormData({ name: '', qualification: '', downloadLink: '', applyForm: '', importantDates: '' });
      } else {
        toast.error('Failed to insert post');
      }
    } catch (error) {
      console.error('Error inserting post:', error);
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Insert Blog Post</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="block w-full p-2 mb-2 border rounded" required />
        <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="Qualification" className="block w-full p-2 mb-2 border rounded" required />
        <input type="url" name="downloadLink" value={formData.downloadLink} onChange={handleChange} placeholder="Download Link" className="block w-full p-2 mb-2 border rounded" required />
        <input type="url" name="applyForm" value={formData.applyForm} onChange={handleChange} placeholder="Apply Form Link" className="block w-full p-2 mb-2 border rounded" required />
        <input type="text" name="importantDates" value={formData.importantDates} onChange={handleChange} placeholder="Important Dates" className="block w-full p-2 mb-2 border rounded" required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full" disabled={loading}>
          {loading ? 'Submitting...' : 'Insert Post'}
        </button>
      </form>
    </div>
  );
}

export default BlogInsert;