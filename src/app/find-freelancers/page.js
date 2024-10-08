"use client";

import React, { useState } from "react";

export default function FindFreelancers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [freelancers, setFreelancers] = useState([
    { id: 1, name: "John Doe", skill: "Web Development", rate: "$50/hr", location: "New York, USA", rating: 4.8 },
    { id: 2, name: "Jane Smith", skill: "Graphic Design", rate: "$40/hr", location: "London, UK", rating: 4.5 },
    { id: 3, name: "Emily Johnson", skill: "Content Writing", rate: "$30/hr", location: "Sydney, Australia", rating: 4.9 },
    // Add more freelancers here
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFreelancers = freelancers.filter((freelancer) =>
    freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    freelancer.skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <header className="flex justify-between items-center py-4 px-8 bg-gray-800">
        <div className="logo">
          <h1 className="text-xl font-bold text-white">FreelancePortal</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="text-gray-300 hover:text-blue-400">Home</a></li>
            <li><a href="/find-freelancers" className="text-gray-300 hover:text-blue-400">Find Freelancers</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400">Post a Project</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400">How it Works</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400">Contact Us</a></li>
          </ul>
        </nav>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-700">Login</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Sign Up</button>
        </div>
      </header>

      {/* Search Section */}
      <section className="bg-gray-900 py-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Find Freelancers</h2>
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search for freelancers by name or skill..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full max-w-md px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-400"
            />
          </div>
        </div>
      </section>

      {/* Freelancer Listings */}
      <section className="py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFreelancers.length > 0 ? (
              filteredFreelancers.map((freelancer) => (
                <div key={freelancer.id} className="bg-gray-800 p-6 shadow-md rounded-md transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-bold text-white mb-2">{freelancer.name}</h3>
                  <p className="mb-2 text-gray-300">Skill: {freelancer.skill}</p>
                  <p className="mb-2 text-gray-300">Rate: {freelancer.rate}</p>
                  <p className="mb-2 text-gray-300">Location: {freelancer.location}</p>
                  <p className="mb-2 text-gray-300">Rating: ⭐ {freelancer.rating}</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">View Profile</button>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-400">No freelancers found matching your criteria.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
