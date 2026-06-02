import React, { useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../Axios";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });

  const changeData = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const submitData = async (e) => {
    e.preventDefault();

    try {
      const postData = new FormData();

      postData.append("title", formData.title);

      if (formData.image) {
        postData.append("image", formData.image);
      }

      const { data } = await baseUrl.post("/posting", postData);

      if (data?.success) {
        toast.success(data?.message);

        setFormData({
          title: "",
          image: null,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error");
    }
  };

  return (
    <div className="card shadow-sm border-0 p-3 rounded-4">
      <textarea
        className="form-control border-0"
        rows="3"
        placeholder="What's on your mind?"
        name="title"
        value={formData.title}
        onChange={changeData}
      ></textarea>

      <div className="d-flex justify-content-between mt-3">
        <input
          type="file"
          className="form-control w-50"
          name="image"
          onChange={changeData}
        />

        <button
          className="btn btn-primary rounded-pill px-4"
          onClick={submitData}
        >
          Post
        </button>
      </div>
    </div>
  );
}
