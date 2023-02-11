import React from "react";
import { useParams } from "react-router";
import CompanyDescription from "../components/HomePageComps/CompanyDescription";
import ProductsSection from "../components/HomePageComps/ProductsSection";
import ContactInfo from "../components/HomePageComps/ContactInfo";

const HomePage = () => {
  const { keyword } = useParams();
  const { pagenumber } = useParams();

  return (
    <div>
      <CompanyDescription />
      <ProductsSection keyword={keyword} pagenumber={pagenumber} />
      <ContactInfo />
    </div>
  );
};

export default HomePage;
