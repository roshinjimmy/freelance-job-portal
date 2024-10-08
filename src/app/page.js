import React from "react";

export default function Home() {
  return (
    <div>
      {/* Header Section */}
      <header className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
        <div className="logo">
          <h1 className="text-xl font-bold">FreelancePortal</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-blue-500">Home</a></li>
            <li><a href="#" className="hover:text-blue-500">Find Freelancers</a></li>
            <li><a href="#" className="hover:text-blue-500">Post a Project</a></li>
            <li><a href="#" className="hover:text-blue-500">How it Works</a></li>
            <li><a href="#" className="hover:text-blue-500">Contact Us</a></li>
          </ul>
        </nav>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Login</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Sign Up</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Connecting Clients and Freelancers in One Click</h2>
          <p className="text-lg mb-8">Post projects, find expert freelancers, and get work done faster.</p>
          <div>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md mr-4">Get Started</button>
            <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md">Browse Freelancers</button>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img src="/post-project-icon.png" alt="Post a Project" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Post a Project</h3>
              <p>Clients post projects with details and budget.</p>
            </div>
            <div>
              <img src="/bid-icon.png" alt="Bid on Project" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Freelancers Bid</h3>
              <p>Freelancers bid on projects based on their skills.</p>
            </div>
            <div>
              <img src="/complete-icon.png" alt="Project Completed" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Work is Completed</h3>
              <p>Clients choose the best offer, and the work begins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Explore Freelance Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div className="bg-white p-6 shadow-md rounded-md">
              <img src="/web-dev-icon.png" alt="Web Development" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Web Development</h3>
            </div>
            <div className="bg-white p-6 shadow-md rounded-md">
              <img src="/graphic-design-icon.png" alt="Graphic Design" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Graphic Design</h3>
            </div>
            <div className="bg-white p-6 shadow-md rounded-md">
              <img src="/digital-marketing-icon.png" alt="Digital Marketing" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Digital Marketing</h3>
            </div>
            <div className="bg-white p-6 shadow-md rounded-md">
              <img src="/writing-icon.png" alt="Writing" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Writing & Translation</h3>
            </div>
            <div className="bg-white p-6 shadow-md rounded-md">
              <img src="/video-animation-icon.png" alt="Video Animation" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Video & Animation</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-md rounded-md">
              <p className="italic">"This platform made it super easy to find a freelancer for my web development project!"</p>
              <p className="mt-4 font-bold">John Doe</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-md">
              <p className="italic">"FreelancePortal helped me secure multiple gigs and grow my freelance business."</p>
              <p className="mt-4 font-bold">Jane Smith</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-md">
              <p className="italic">"I love how easy it is to post projects and find quality freelancers here!"</p>
              <p className="mt-4 font-bold">Emily Johnson</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 py-6">
        <div className="container mx-auto text-center text-white">
          <p>© 2024 FreelancePortal. All Rights Reserved.</p>
          <p>Follow us on social media:</p>
          <div className="flex justify-center space-x-4">
            <a href="#"><img src="/facebook-icon.png" alt="Facebook" /></a>
            <a href="#"><img src="/twitter-icon.png" alt="Twitter" /></a>
            <a href="#"><img src="/linkedin-icon.png" alt="LinkedIn" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
