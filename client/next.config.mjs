// import  { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"project-management-s3-image.s3.us-east-1.amazonaws.com",
        port:"",
        pathname:"/**",
      }
    ]
  }
};

export default nextConfig;
