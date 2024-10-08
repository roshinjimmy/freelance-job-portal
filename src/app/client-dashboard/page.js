"use client"; // Required for client-side interactivity

import React, { useState } from "react";

export default function ClientDashboard() {
  // Temporary state to hold list of projects (you'll fetch this from the database later)
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Website Development",
      description: "Looking for a developer to create a responsive website.",
      status: "Open",
    },
    {
      id: 2,
      title: "Mobile App Design",
      description: "Need a mobile app designed for iOS and Android.",
      status: "In Progress",
    },
  ]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="py-4 px-6">
          <h2 className="text-xl font-bold">Client Dashboard</h2>
          <ul className="mt-6">
            <li className="py-2">
              <a href="/client-dashboard" className="hover:text-blue-400">Dashboard</a>
            </li>
            <li className="py-2">
              <a href="/post-project" className="hover:text-blue-400">Post a Project</a>
            </li>
            <li className="py-2">
              <a href="/manage-projects" className="hover:text-blue-400">Manage Projects</a>
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
          <h1 className="text-2xl font-bold">My Projects</h1>
          <a href="/post-project" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Post a New Project
          </a>
        </div>

        {/* Projects List */}
        <section className="mt-6">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div key={project.id} className="bg-white p-4 shadow-md rounded-md">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-700 mb-2">{project.description}</p>
                  <p className={`mb-2 ${project.status === 'Open' ? 'text-green-500' : 'text-orange-500'}`}>
                    Status: {project.status}
                  </p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 text-center">You haven't posted any projects yet.</p>
          )}
        </section>
      </main>
    </div>
  );
}
