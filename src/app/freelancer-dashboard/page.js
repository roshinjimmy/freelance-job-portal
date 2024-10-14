"use client"; // Required for client-side interactivity

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient"; // Import the Supabase client

export default function FreelancerDashboard() {
  const [user, setUser] = useState(null);
  const [freelancer, setFreelancer] = useState(null); // State to store freelancer information
  const [projects, setProjects] = useState([]);
  const [currentProjects, setCurrentProjects] = useState([]); // State to store current projects
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchFreelancerData(userData.user_id); // Fetch freelancer data
    } else {
      router.push("/login"); // Redirect to login if no user is found
    }
  }, [router]);

  const fetchFreelancerData = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("freelancers")
        .select("*")
        .eq("user_id", userId) // Get freelancer by user_id
        .single(); // Get single freelancer data

      if (error) throw error;
      setFreelancer(data);

      // After fetching freelancer data, fetch available and current projects
      fetchAvailableProjects();
      fetchCurrentProjects(data.freelancer_id); // Fetch current projects
    } catch (error) {
      console.error("Error fetching freelancer data:", error);
      setError("Failed to fetch freelancer data.");
    }
  };

  const fetchAvailableProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .is("freelancer_id", null); // Fetch projects that are not yet assigned

      if (error) throw error;
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch available projects.");
    }
  };

  const fetchCurrentProjects = async (freelancerId) => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("freelancer_id", freelancerId); // Fetch projects assigned to the freelancer

      if (error) throw error;
      setCurrentProjects(data);
    } catch (error) {
      console.error("Error fetching current projects:", error);
      setError("Failed to fetch current projects.");
    }
  };

  const handleSelectProject = async (projectId) => {
    setError("");
    setSelectedProjectId(projectId);

    try {
      const { error } = await supabase
        .from("projects")
        .update({ freelancer_id: freelancer.freelancer_id }) // Update the project with the freelancer's ID
        .eq("project_id", projectId);

      if (error) throw error;

      // Refresh the projects list after selection
      fetchAvailableProjects();
      fetchCurrentProjects(freelancer.freelancer_id); // Refresh current projects
    } catch (error) {
      console.error("Error selecting project:", error);
      setError("Failed to select project.");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Freelancer Details</h2>
        {freelancer ? (
          <div className="text-white">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Experience Level:</strong> {freelancer.experience_level}</p>
            <p>
              <strong>Skills:</strong> {Array.isArray(freelancer.skills) ? freelancer.skills.join(", ") : "No skills listed"}
            </p>
            <button
              onClick={handleSignOut}
              className="mt-6 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <p className="text-gray-400">Loading freelancer data...</p>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-white mb-6">Freelancer Dashboard</h1>

        {error && <p className="text-red-500">{error}</p>}

        <h3 className="text-2xl font-semibold text-white mb-4">Current Projects</h3>
        {currentProjects.length > 0 ? (
          <ul className="list-disc list-inside bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
            {currentProjects.map((project) => (
              <li key={project.project_id} className="text-white mb-4">
                <strong>Project Name:</strong> {project.project_name} <br />
                <strong>Project Description:</strong> {project.project_description} <br />
                <strong>Specified Price:</strong> ${project.specified_price} <br />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white mb-6">You are not currently working on any projects.</p>
        )}

        <h3 className="text-2xl font-semibold text-white mb-4">Available Projects</h3>
        {projects.length > 0 ? (
          <ul className="list-disc list-inside bg-gray-800 p-4 rounded-lg shadow-lg">
            {projects.map((project) => (
              <li key={project.project_id} className="text-white mb-4">
                <strong>Project Name:</strong> {project.project_name} <br />
                <strong>Project Description:</strong> {project.project_description} <br />
                <strong>Specified Price:</strong> ${project.specified_price} <br />
                <button
                  onClick={() => handleSelectProject(project.project_id)}
                  className="mt-2 bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
                >
                  Select Project
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">No available projects at the moment.</p>
        )}
      </div>
    </div>
  );
}
