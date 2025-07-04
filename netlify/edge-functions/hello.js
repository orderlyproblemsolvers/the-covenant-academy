// netlify/edge-functions/hello.js
export default async (request, context) => {
    return new Response("Hello from Edge!", { status: 200 });
  };