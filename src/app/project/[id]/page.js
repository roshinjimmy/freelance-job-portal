"use client"; // Required for client-side interactivity

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProjectBiddingPage({ params }) {
  const [project, setProject] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [bidStatus, setBidStatus] = useState("");
  const router = useRouter();

  const { id } = params; // Get project ID from the URL

  // Simulated function to fetch project details
  const fetchProjectDetails = async () => {
    // Simulating an API call to fetch project details based on the ID
    const projectDetails = {
      id,
      title: "Website Development",
      description: "Develop a website using React and Node.js.",
      budget: "$500",
      skills: "JavaScript, React",
    };

    setProject(projectDetails);
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulating the submission of the bid
    if (bidAmount) {
      console.log(`Bid placed: $${bidAmount} for project ${project.title}`);
      setBidStatus(`Your bid of $${bidAmount} has been placed successfully!`);
      setBidAmount(""); // Reset bid amount
    } else {
      setBidStatus("Please enter a valid bid amount.");
    }
  };

  if (!project) return <p className="text-center text-gray-500">Loading project details...</p>; // Loading state

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-gray-800 p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-white">{project.title}</h1>
        <p className="mb-4 text-gray-300"><strong>Description:</strong> {project.description}</p>
        <p className="mb-4 text-gray-300"><strong>Budget:</strong> {project.budget}</p>
        <p className="mb-4 text-gray-300"><strong>Required Skills:</strong> {project.skills}</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-300">Your Bid Amount ($)</label>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Place Bid
          </button>
        </form>

        {bidStatus && (
          <p className="mt-4 text-green-400">{bidStatus}</p>
        )}
      </div>
    </div>
  );
}
