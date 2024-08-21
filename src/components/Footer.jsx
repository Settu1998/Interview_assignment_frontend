import React from "react";

const Footer = () => {
  return (
    <div className="Footer">
      <h2 style={{ textAlign: "center", margin: "1rem 0 0" }}>
        Settu
      </h2>
      <p>
        GitHub:
        <a
          href=" https://github.com/Settu1998/Interview_assignment_frontend.git"
          style={{
            textDecoration: "underline",
            color: "#0D6EFD",
            marginLeft: "8px",
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/Settu1998/Interview_assignment
        </a>
      </p>
    </div>
  );
};

export default Footer;
