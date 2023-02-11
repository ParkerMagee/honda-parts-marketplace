import React from "react";
import { Link } from "react-router-dom";
import ContactInfo from "../components/HomePageComps/ContactInfo";

const ContactPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center bg-gray-200">
        <h1 className="text-3xl text-center font-bold mx-20 my-20">
          This Page Does Not Contain Real Contact Information as This is a
          Demonstration Website
        </h1>
        <p className="text-center mb-20 mx-10 lg:mx-64">
          If you would like to view my personal contact information or other
          projects, you can go to my personal portfolio {""}
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
      <div className="bg-gray-900 h-10"></div>
      <ContactInfo />
    </div>
  );
};

export default ContactPage;
