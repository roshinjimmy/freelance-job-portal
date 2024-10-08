"use client"; // Required for client-side interactivity

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importing useRouter

export default function FreelancerDashboard() {
  const [availableProjects, setAvailableProjects] = useState([]);
  const [bids, setBids] = useState([]);
  const router = useRouter();

  // Fetch available projects (simulate data fetch)
  useEffect(() => {
    const fetchAvailableProjects = async () => {
      // Simulating an API call to fetch available projects
      const projects = [
        {
          id: 1,
          title: "Website Development",
          description: "Develop a website using React and Node.js.",
          budget: "$500",
          skills: "JavaScript, React",
        },
        {
          id: 2,
          title: "Mobile App Design",
          description: "Create a mobile app design for a shopping platform.",
          budget: "$300",
          skills: "UI/UX, Mobile Design",
        },
      ];

      setAvailableProjects(projects);
    };

    fetchAvailableProjects();
  }, []);

  // Fetch bids placed by the freelancer (simulate data fetch)
  useEffect(() => {
    const fetchBids = async () => {
      // Simulating an API call to fetch the freelancer's bids
      const freelancerBids = [
        {
          projectId: 1,
          projectTitle: "Website Development",
          bidAmount: 450,
          status: "Pending",
        },
        {
          projectId: 2,
          projectTitle: "Mobile App Design",
          bidAmount: 300,
          status: "Accepted",
        },
      ];

      setBids(freelancerBids);
    };

    fetchBids();
  }, []);

  const handleBidNow = (projectId) => {
    router.push(`/project/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-6 text-white">Freelancer Dashboard</h1>

        {/* Available Projects */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-300">Available Projects</h2>

          {availableProjects.length > 0 ? (
            availableProjects.map((project) => (
              <div key={project.id} className="bg-gray-700 border border-gray-600 p-4 mb-4 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-bold text-white">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
                <p className="text-gray-300"><strong>Budget:</strong> {project.budget}</p>
                <p className="text-gray-300"><strong>Required Skills:</strong> {project.skills}</p>
                <button
                  onClick={() => handleBidNow(project.id)}
                  className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Bid Now
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No projects available at the moment.</p>
          )}
        </div>

        {/* Bids Status */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-300">Your Bids</h2>

          {bids.length > 0 ? (
            bids.map((bid, index) => (
              <div key={index} className="bg-gray-700 border border-gray-600 p-4 mb-4 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-bold text-white">{bid.projectTitle}</h3>
                <p className="text-gray-300"><strong>Bid Amount:</strong> ${bid.bidAmount}</p>
                <p className="text-gray-300"><strong>Status:</strong> {bid.status}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">You haven't placed any bids yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
