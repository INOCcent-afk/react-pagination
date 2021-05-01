import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Posts from "./components/Posts";
import PaginationComponent from "./components/Pagination";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const fetchPlanets = async (page, posts) => {
  const res = await axios.get(
    `http://jsonplaceholder.typicode.com/posts/?page=${page}`
  );
  posts(res.data);
};

function App() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const { status } = useQuery(["posts", currentPage, setPosts], () => {
    fetchPlanets(currentPage, setPosts);
  });

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
      {status === "loading" && <div>loading data</div>}
      {status === "success" && (
        <>
          <Posts posts={currentPosts} />
          <PaginationComponent
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            currentPage={setCurrentPage}
            page={currentPage}
          />
        </>
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default App;
