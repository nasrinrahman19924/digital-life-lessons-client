/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "png.pngtree.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
       {
        protocol: "https",
        hostname: "www.commonsense.org",
      },
       {
        protocol: "https",
        hostname: "kommodo.ai",
      },
       {
        protocol: "https",
        hostname: "ibb.co.com",
      },
       {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
       {
        protocol: "https",
        hostname: "cdn2.psychologytoday.com",
      },
       {
        protocol: "https",
        hostname: "i0.wp.com",
      },
       {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
    ],
  },
};

export default nextConfig;
