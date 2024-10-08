"use client"; // Required for client-side interactivity

import React, { useState } from "react";

export default function FreelancerDashboard() {
  // Temporary state to hold list of projects (you'll fetch this from the database later)
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Website",
      description: "Looking for a developer to build an e-commerce site.",
      budget: "$500",
    },
    {
      id: 2,
      title: "Mobile App Design",
      description: "Need a designer for a mobile app.",
      budget: "$300",
    },
    {
      id: 3,
      title: "API Integration",
      description: "Looking for someone to integrate third-party APIs.",
      budget: "$200",
    },
  ]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="py-4 px-6">
          <h2 className="text-xl font-bold">Freelancer Dashboard</h2>
          <ul className="mt-6">
            <li className="py-2">
              <a href="/freelancer-dashboard" className="hover:text-blue-400">Dashboard</a>
            </li>
            <li className="py-2">
              <a href="/browse-projects" className="hover:text-blue-400">Browse Projects</a>
            </li>
            <li className="py-2">
              <a href="/my-bids" className="hover:text-blue-400">My Bids</a>
            </li>
            <li className="py-2">
              <a href="/profile" className="hover:text-blue-400">Profile</a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Dashboard Section */}
      <main className="flex-1 p-6 bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Available Projects</h1>
        </div>

        {/* Projects List */}
        <section className="mt-6">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div key={project.id} className="bg-white p-4 shadow-md rounded-md">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-700 mb-2">{project.description}</p>
                  <p className="text-gray-500 mb-2">Budget: {project.budget}</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Place a Bid
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 text-center">No projects available at the moment.</p>
          )}
        </section>
      </main>
    </div>
  );
}
