import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Posts from "./components/Posts";
import PaginationComponent from "./components/Pagination";

function App() {
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("http://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      <h1>My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <PaginationComponent
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={setCurrentPage}
        page={currentPage}
      />
    </div>
  );
}

export default App;
