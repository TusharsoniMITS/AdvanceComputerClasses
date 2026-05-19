import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function SliderImage() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch images
  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/viewallimage');
      setImages(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch images.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select an image!');
      return;
    }
    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      await axios.post('/api/insertimage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Image uploaded!');
      setFile(null);
      fetchImages();
    } catch (err) {
      console.error(err);
      toast.error('Image upload failed.');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id, public_id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/deleteimage/${id}`, { data: { public_id } });
      toast.success('Image deleted!');
      fetchImages();
    } catch (err) {
      console.error(err);
      toast.error('Image deletion failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Slider Image Manager</h2>

      <form
        onSubmit={handleUpload}
        className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8"
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-gray-300 p-2 rounded w-full sm:w-auto"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.length === 0 ? (
            <p className="text-center text-red-500 col-span-full">No image available</p>
          ) : (
            images.map((img) => (
              <div key={img._id} className="border rounded shadow bg-white">
                <img
                  src={img.image.url}
                  alt="Slider"
                  className="w-full object-cover rounded-t"
                />

                <div className="p-3 flex justify-between items-center">
                  <button
                    onClick={() => handleDelete(img._id, img.image.public_id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SliderImage;
