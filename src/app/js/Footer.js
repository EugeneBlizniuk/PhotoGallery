import React from "react";

const Footer = () => (
  <footer className="footer">
  <div className="footer-style">
    <p>
      Contact us: <a href=""> online.gallery@yandex.by </a>
      <br />
      &copy; {new Date().getFullYear()} Copyright
    </p>
  </div>
  </footer>
);

export default Footer;