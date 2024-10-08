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
      <header className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
        <div className="logo">
          <h1 className="text-xl font-bold">FreelancePortal</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-blue-500">Home</a></li>
            <li><a href="/find-freelancers" className="hover:text-blue-500">Find Freelancers</a></li>
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

      {/* Search Section */}
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Find Freelancers</h2>
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search for freelancers by name or skill..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full max-w-md px-4 py-2 border rounded-md"
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
                <div key={freelancer.id} className="bg-white p-6 shadow-md rounded-md">
                  <h3 className="text-xl font-bold mb-2">{freelancer.name}</h3>
                  <p className="mb-2">Skill: {freelancer.skill}</p>
                  <p className="mb-2">Rate: {freelancer.rate}</p>
                  <p className="mb-2">Location: {freelancer.location}</p>
                  <p className="mb-2">Rating: ⭐ {freelancer.rating}</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md">View Profile</button>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No freelancers found matching your criteria.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
