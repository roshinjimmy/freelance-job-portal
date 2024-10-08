"use client";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Your Freelance Portal</h1>
        <p className="text-lg mb-6">Connect clients and freelancers with ease.</p>
        <div>
          <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
            Get Started
          </a>
        </div>
      </div>
      <div className="mt-10">
        <img src="/path-to-your-image.jpg" alt="Freelancing" className="w-full max-w-lg rounded-lg shadow-lg" />
      </div>
    </div>
  );
}
