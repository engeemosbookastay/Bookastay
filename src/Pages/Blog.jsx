import React from "react";

const Blog = () => {
  return (
    <div style={{ width: "100%", height: "calc(100vh - 80px)", overflow: "hidden" }}>
      <iframe
        src="https://blog.bookastayng.com"
        title="Engeemos Bookastay Blog"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        allowFullScreen
      />
    </div>
  );
};

export default Blog;
