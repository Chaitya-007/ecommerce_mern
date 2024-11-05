import React from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <h1>Dashboard Page</h1>
    </Layout>
  );
};

export default Dashboard;
