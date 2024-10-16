"use client"; // Required for client-side interactivity

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient"; // Import the Supabase client
import { FaSignOutAlt, FaPlusCircle } from 'react-icons/fa'; // Importing icons

export default function ClientDashboard() {
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null); // State to store client information
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState(""); // Updated for project description
  const [newProjectPrice, setNewProjectPrice] = useState(""); // Updated for specified price
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchClientData(userData.user_id); // Fetch client data
    } else {
      router.push("/login"); // Redirect to login if no user is found
    }
  }, [router]);

  const fetchClientData = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", userId) // Get client by user_id
        .single(); // Get single client data

      if (error) throw error;
      setClient(data);

      // After fetching client data, fetch associated projects
      fetchProjects(data.client_id); // Use the fetched client_id to get projects
    } catch (error) {
      console.error("Error fetching client data:", error);
      setError("Failed to fetch client data.");
    }
  };

  const fetchProjects = async (clientId) => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("client_id", clientId); // Fetch projects using client_id

      if (error) throw error;
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects.");
    }
  };

  const handlePostProject = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { error } = await supabase
        .from("projects")
        .insert({
          project_name: newProjectName,
          project_description: newProjectDescription, // Updated for project description
          specified_price: newProjectPrice, // Updated for specified price
          client_id: client.client_id, // Use the client_id from the client state
        });

      if (error) throw error;

      // Reset form and fetch updated projects
      setNewProjectName("");
      setNewProjectDescription(""); // Reset project description
      setNewProjectPrice(""); // Reset specified price
      fetchProjects(client.client_id); // Fetch projects again with the current client_id
    } catch (error) {
      console.error("Error posting project:", error);
      setError("Failed to post project.");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Client Details</h2>
        {client ? (
          <div className="text-white">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Company Name:</strong> {client.company_name}</p>
            <button
              onClick={handleSignOut}
              className="mt-6 flex items-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
            >
              <FaSignOutAlt className="mr-2" /> Sign Out
            </button>
          </div>
        ) : (
          <p className="text-gray-400">Loading client data...</p>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-white mb-6">Client Dashboard</h1>

        <form onSubmit={handlePostProject} className="mb-6 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-2">Post a New Project</h3>
          {error && <p className="text-red-500">{error}</p>}

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-300">Project Name</label>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-300">Project Description</label>
            <textarea
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-300">Specified Price</label>
            <input
              type="number"
              value={newProjectPrice}
              onChange={(e) => setNewProjectPrice(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 w-full"
          >
            <FaPlusCircle className="mr-2" /> Post Project
          </button>
        </form>

        <h3 className="text-2xl font-semibold text-white mb-2">Posted Projects</h3>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div key={project.project_id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-white">{project.project_name}</h4>
                <p className="text-gray-400">{project.project_description}</p>
                <p className="text-white mt-2"><strong>Specified Price:</strong> ${project.specified_price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white">No projects posted yet.</p>
        )}
      </div>
    </div>
  );
}
