
import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import axios  from "axios";
import { useParams, Link } from "react-router-dom";

const BelogDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPost = async () => {
          const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
          setPost(data);
        };
        fetchPost();
      }, [id]);
  return (
    <>
      <Layout title={`Blog Post - ${post.title}`}>
        <Link to="/blog" className="btn btn-secondary mb-3">
          ← Back to Blog
        </Link>
        <div className="container mt-4">
          <h2 className="text-center mb-4">Blog Posts</h2>
          <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title">{post.title}</h2>
            <p className="text-muted">Post ID: {post.id}</p>
            <p className="card-text">{post.body}</p>
          </div>
        </div>
        </div>
      </Layout>
    </>
  );
};

export default BelogDetails;
