import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects(){
    return[
      {
        source : "/",
        destination : "/login",
        permanent : false
      },
    ];
  },
  reactStrictMode : false,
  env : {
    NEXT_PUBLIC_API_URL : "http://localhost:8080/api/"
  }
};

export default nextConfig;
