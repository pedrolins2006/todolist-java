import React from "react";

const Header = ({ children }) => {
  return (
    <>
      <section className="text-center mb-8 w-full">{children}</section>
    </>
  );
};

export default Header;
