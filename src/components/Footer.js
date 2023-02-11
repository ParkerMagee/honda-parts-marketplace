import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const clickHandler = (e) => {
    e.preventDefault();
    const emailForm = document.getElementById("email-form");
    const emailMessage = document.getElementById("email-message");

    emailForm.classList.toggle("hidden");
    emailForm.classList.toggle("flex");
    emailMessage.classList.toggle("hidden");
  };
  return (
    <div className="flex flex-col max-w-screen justify-start items-center py-8 bg-red-500 xl:flex-row">
      <div className="flex mb-10 xl:mb-0">
        <div className="flex flex-col text-center items-center mx-5 xl:text-left xl:items-start xl:mx-32">
          <h1 className="text-xl mb-1 font-bold">Support</h1>
          <Link to="/contact">Contact Us</Link>
          <Link to="/does-not-exist">FAQ</Link>
          <Link to="/does-not-exist">Product Warranty</Link>
          <Link to="/does-not-exist">Return Policy</Link>
        </div>
        <div className="flex flex-col text-center items-center mx-5 xl:text-left xl:items-start xl:mx-32">
          <h1 className="text-xl mb-1 font-bold">Company Info</h1>
          <Link to="/about">About</Link>
          <Link to="/">Products</Link>
          <Link to="/does-not-exist">Careers</Link>
        </div>
      </div>

      <div className="flex flex-col items-center mb-6 xl:items-start xl:mx-24">
        <p
          id="email-message"
          className="hidden bg-gray-900 text-white w-96 mt-5 px-4 py-2 rounded-md"
        >
          The email you entered will not be used as this is a demonstration
          webpage. Please click {""}
          <a
            className="font-bold text-red-500 hover:text-red-600"
            href="https://parker-magee.vercel.app"
          >
            Here
          </a>
          {""} if you would like to view the developers personal website.
        </p>
        <div id="email-form" className="flex flex-col items-center">
          <h1 className="mb-2 xl:mb-4 xl:text-xl">
            Want to recieve product updates?
          </h1>
          <form className="flex h-8">
            <input
              className="h-full w-60 pl-2 pr-8 rounded-l-md"
              placeholder="Enter your e-mail address"
            />
            <button
              className="h-full bg-gray-200 px-2 rounded-r-md hover:bg-gray-900 hover:text-white"
              onClick={clickHandler}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
