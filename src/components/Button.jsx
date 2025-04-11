import React from "react";
import { Link } from "react-router-dom";

export const Button = ({ title, link }) => {
  return (
    <Link
      className="bg-primary text-white px-3 py-2 rounded font-bold hover:animate-bounce"
      to={link || "#"}
    >
      {title || "Learn"}
    </Link>
  );
};
