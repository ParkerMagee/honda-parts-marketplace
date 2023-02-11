import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const ContactInfo = () => {
  return (
    <div className="flex flex-col items-center bg-gray-900">
      <h1 className="text-white text-3xl mb-10">Contact Us</h1>
      <div className="flex flex-col items-start mx-10 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-64 text-white mx-20 mb-10">
          <LocationOnOutlinedIcon />
          <h1 className="my-1.5">Address</h1>
          <p className="text-center my-1.5">123 Not a Real St.</p>
          <p className="text-center my-1.5">Toronto ON, Canada</p>
        </div>
        <div className="flex flex-col justify-center items-center w-64 text-white mx-20 mb-10">
          <HeadsetMicOutlinedIcon />
          <h1 className="my-1.5">Customer Service</h1>
          <p className="text-center my-1.5">1 (234) 567-8910 </p>
        </div>
        <div className="flex flex-col justify-center items-center w-64 text-white mx-20 mb-10">
          <EmailOutlinedIcon />
          <h1 className="my-1.5">Email</h1>
          <p className="text-center my-1.5">not.real@test.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
