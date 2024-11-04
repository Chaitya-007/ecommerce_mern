import React from "react";
import Layout from "../components/Layout/Layout";

const PageNotFount = () => {
  return (
    <Layout>
      <div className="pnf">
        <h1>404 </h1>
        <h2>Oops! Page Not Found</h2>
        <button className="pnf-button">Go Back</button>
      </div>
    </Layout>
  );
};

export default PageNotFount;
