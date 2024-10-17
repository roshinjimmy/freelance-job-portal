"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";
import { FaTrash, FaSignOutAlt } from "react-icons/fa";

export default function AdminDashboard() {
  const router = useRouter();
  const [clients, setClients] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);

      if (userData.role === "admin") {
        fetchClients();
        fetchFreelancers();
        fetchProjects();
      } else {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
    setIsLoading(false);
  }, [router]);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase.rpc("fetch_clients_with_user_data");
      if (error) throw error;
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setError("Failed to fetch clients.");
    }
  };

  const fetchFreelancers = async () => {
    try {
      const { data, error } = await supabase.rpc("fetch_freelancers_with_user_data");
      if (error) throw error;
      setFreelancers(data);
    } catch (error) {
      console.error("Error fetching freelancers:", error);
      setError("Failed to fetch freelancers.");
    }
  };

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase.rpc("fetch_projects_with_clients_freelancers");
      if (error) throw error;
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects.");
    }
  };

  const handleDeleteClient = async (clientId) => {
    try {
      const { error } = await supabase.from("clients").delete().eq("client_id", clientId);
      if (error) throw error;
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
      setError("Failed to delete client.");
    }
  };

  const handleDeleteFreelancer = async (freelancerId) => {
    try {
      const { error } = await supabase.from("freelancers").delete().eq("freelancer_id", freelancerId);
      if (error) throw error;
      fetchFreelancers();
    } catch (error) {
      console.error("Error deleting freelancer:", error);
      setError("Failed to delete freelancer.");
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const { error } = await supabase.from("projects").delete().eq("project_id", projectId);
      if (error) throw error;
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      setError("Failed to delete project.");
    }
  };

  // Sign out function
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="flex items-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
        >
          <FaSignOutAlt className="mr-2" /> Sign Out
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      {/* Clients Section */}
      <h2 className="text-2xl font-semibold text-white mb-4">Clients</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6 overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="text-white">
              <th className="px-4 py-2">Client ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Company Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.client_id} className="text-gray-300 hover:bg-gray-700 transition duration-200">
                <td className="border px-4 py-2">{client.client_id}</td>
                <td className="border px-4 py-2">{client.name}</td>
                <td className="border px-4 py-2">{client.email}</td>
                <td className="border px-4 py-2">{client.company_name}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteClient(client.client_id)}
                    className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-200 flex items-center"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Freelancers Section */}
      <h2 className="text-2xl font-semibold text-white mb-4">Freelancers</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6 overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="text-white">
              <th className="px-4 py-2">Freelancer ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Experience Level</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {freelancers.map((freelancer) => (
              <tr key={freelancer.freelancer_id} className="text-gray-300 hover:bg-gray-700 transition duration-200">
                <td className="border px-4 py-2">{freelancer.freelancer_id}</td>
                <td className="border px-4 py-2">{freelancer.name}</td>
                <td className="border px-4 py-2">{freelancer.email}</td>
                <td className="border px-4 py-2">{freelancer.experience_level}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteFreelancer(freelancer.freelancer_id)}
                    className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-200 flex items-center"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Projects Section */}
      <h2 className="text-2xl font-semibold text-white mb-4">Projects</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6 overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="text-white">
              <th className="px-4 py-2">Project ID</th>
              <th className="px-4 py-2">Project Name</th>
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Freelancer Assigned</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.project_id} className="text-gray-300 hover:bg-gray-700 transition duration-200">
                <td className="border px-4 py-2">{project.project_id}</td>
                <td className="border px-4 py-2">{project.project_name}</td>
                <td className="border px-4 py-2">{project.client_name}</td>
                <td className="border px-4 py-2">{project.freelancer_name || "Not Assigned"}</td>
                <td className="border px-4 py-2">${project.specified_price}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteProject(project.project_id)}
                    className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-200 flex items-center"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
