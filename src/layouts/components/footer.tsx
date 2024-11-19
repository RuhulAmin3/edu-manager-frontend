import { Layout } from "antd";
import React from "react"; 
const { Footer } = Layout;
const LayoutFooter = () => {
  return (
    <Footer style={{ textAlign: "center", backgroundColor:"transparent" }}>
      Edu - Manager ©{new Date().getFullYear()} Created by Ruhul Amin
    </Footer>
  );
};

export default LayoutFooter;
