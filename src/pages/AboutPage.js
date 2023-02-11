import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="flex flex-col bg-gray-200 w-screen items-center">
      <h1 className="text-3xl text-center font-bold my-32 mx-10">
        This is a Demonstration Website and Does Not Sell Any Real Products
      </h1>
      <p className="text-center mb-36 mx-10 lg:mx-64">
        This website was designed to appear as though it is an ecommerce website
        that sells vehicle modifocations for Hondas, however while this website
        does have a fully functioning back-end there are currently no physical
        products for sale. If you would like to view other projects that I have
        built, or you would like to conatct me about any personal or business
        inquiries, please visit my personal portfolio {""}
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

export default AboutPage;
