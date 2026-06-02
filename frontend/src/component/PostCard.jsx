import React, { useState } from "react";
import { baseUrl } from "../../Axios";
import { toast } from "react-toastify";

export default function PostCard({ item }) {
  const [likes, setLikes] = useState(item?.likes || []);

  const [comments, setComments] = useState(item?.comments || []);

  const [text, setText] = useState("");

  const login = localStorage.getItem("login");
  const name = localStorage.getItem("name");
  const userId = localStorage.getItem("userId");

  // LIKE
  const likeToggle = async () => {
    try {
      if (!login) {
        toast.error("Please login first");
        return;
      }

      const { data } = await baseUrl.put(`/like/${item._id}`, { userId });

      if (data.success) {
        setLikes(data.likes);
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  // COMMENT
  const commentPost = async () => {
    try {
      if (!login) {
        toast.error("Please login first");
        return;
      }

      if (!text.trim()) {
        toast.error("Enter comment");
        return;
      }

      const { data } = await baseUrl.post(`/comment/${item._id}`, {
        userId,
        text,
      });

      if (data.success) {
        setComments(data.comments);
        setText("");
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 p-3 mb-4">
      {/* User */}
      <div className="d-flex align-items-center mb-3">
        <img
          src="https://i.pravatar.cc/40"
          alt=""
          width="40"
          height="40"
          className="rounded-circle"
        />

        <h6 className="ms-2 mb-0">{item?.userId?.name || name || "Guest"}</h6>
      </div>

      {/* Title */}
      {item?.title && <p className="mb-3">{item.title}</p>}

      {/* Image */}
      {item?.image && (
        <img
          src={item.image}
          alt="post"
          className="img-fluid rounded-4 mb-3"
          style={{
            width: "100%",
            maxHeight: "500px",
            objectFit: "contain",
            background: "#f5f5f5",
          }}
        />
      )}

      {/* Like + Comment Count */}
      <div className="d-flex gap-3 mb-3">
        <button className="btn btn-light border" onClick={likeToggle}>
          ❤️ {likes.length} Likes
        </button>

        <button className="btn btn-light border">
          💬 {comments.length} Comments
        </button>
      </div>

      {/* Comment Input */}
      <div className="d-flex gap-2">
        <input
          type="text"
          placeholder="Write comment..."
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="btn btn-primary" onClick={commentPost}>
          Send
        </button>
      </div>

      {/* Comments */}
      <div className="mt-3">
        {comments?.map((c) => (
          <div key={c._id} className="border rounded p-2 mb-2">
            <strong>{c?.userId?.name}</strong>

            <p className="mb-0">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
