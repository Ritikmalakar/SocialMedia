import React, { useEffect, useState } from "react";

import CreatePost from "../component/CreatePost";
import PostCard from "../component/PostCard";
import { baseUrl } from "../../Axios";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const getData = async () => {
    try {
      const { data } = await baseUrl.get("/getAll");

      if (data?.success) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container py-4">
      <CreatePost />

      <div className="mt-4">
        {posts?.map((item) => (
          <PostCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
