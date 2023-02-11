import React from "react";
import { Link } from "react-router-dom";

const DoesNotExist = () => {
  return (
    <div className="flex flex-col bg-gray-200 w-screen items-center">
      <h1 className="text-3xl text-center font-bold my-32 mx-10">
        This Page Does not Exist as This is a Demonstration Website
      </h1>
      <p className="text-center mb-36 mx-10 lg:mx-64">
        If you would like to see more of my projects you can visit my personal
        portfolio {""}
        <a
          className="font-bold text-red-500 hover:text-red-600"
          href="https://parker-magee.vercel.app"
        >
          Here
        </a>
        {""} or you can {""}
        <Link className="font-bold text-red-500 hover:text-red-600" to="/">
          Return to the Home Page
        </Link>
        {""} and explore the rest of this website.
      </p>
    </div>
  );
};

export default DoesNotExist;
