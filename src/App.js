import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Posts from './components/Posts';
import Pagination from './components/Pagination';

import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, seLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async() => {
      seLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setPosts(res.data);
        seLoading(false);
    }
    fetchPosts();
  }, []);

  // Get current post
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>My Blog</h1>
      <Posts posts={currentPost} loading={loading}/>
      <Pagination postsPerPage={postPerPage} totalPosts={posts.length} paginate={paginate} />
    </div>
  );
}

export default App;
