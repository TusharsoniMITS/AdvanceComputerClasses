import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogView = () => {
  const { postId } = useParams(); // Get the post ID from the route
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch blog post details from API
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blogview/${postId}`);
        const data = await response.json();
        setPost(data.data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <div className="text-center text-xl font-bold mt-10">Loading...</div>;
  }

  if (!post) {
    return <div className="text-center text-xl font-bold mt-10">Post not found</div>;
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 p-6 my-20">
    <div className="max-w-6xl w-full bg-white rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
      {/* Ensure post exists before rendering */}
      {post && (
        <>
          {/* Post Title */}
          <h1 className="text-3xl font-bold mb-4 underline ">
            {post.name || "No Title Available"}
          </h1>
  
          {/* Important Dates */}
          {post.importantDates && (
            <p className="text-gray-700 leading-relaxed text-lg">
              <span className="font-semibold text-gray-700">Important Dates: </span>
              {post.importantDates}
            </p>
          )}
  
          {/* Qualification */}
          {post.qualification && (
            <p className="text-lg leading-relaxed text-gray-700">
              <span className="font-semibold text-gray-800">Qualification: </span>
              {post.qualification}
            </p>
          )}
  
          {/* Apply Form */}
          {post.applyForm && (
            <p className="text-lg leading-relaxed text-blue-500">
              <span className="font-semibold text-gray-800">Apply Form: </span>
              <a href={post.applyForm} className="underline" target="_blank" rel="noopener noreferrer">
                {post.applyForm}
              </a>
            </p>
          )}
  
          {/* Download Link */}
          {post.downloadLink && (
            <p className="text-lg leading-relaxed text-blue-500 cursor-pointer">
              <span className="font-semibold text-gray-800">Download Link: </span>
              <a href={post.downloadLink} className="underline" target="_blank" rel="noopener noreferrer">
                {post.downloadLink}
              </a>
            </p>
          )}
        </>
      )}
    </div>
  </div>
  

  );
};

export default BlogView;
