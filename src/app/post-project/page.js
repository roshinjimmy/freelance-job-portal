"use client"; // Required for client-side interactivity

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient"; // Import the Supabase client

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Combined first and last name for simplicity
  const [role, setRole] = useState("client"); // Default role is "client"
  const [skills, setSkills] = useState(""); // For freelancer
  const [companyName, setCompanyName] = useState(""); // For client
  const [experienceLevel, setExperienceLevel] = useState("beginner"); // For freelancer's experience level
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // User Login
        const { data, error: fetchError } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single();

        if (fetchError) throw fetchError;

        // Check password (assuming you're using Supabase's authentication system here)
        const isPasswordCorrect = password === data.password; // Modify this based on your authentication logic
        if (!isPasswordCorrect) {
          throw new Error("Invalid email or password");
        }

        console.log("User logged in:", data);
        router.push(`/${data.usertype}-dashboard`); // Redirect to the dashboard based on role
      } else {
        // User Signup
        const { data: userData, error: insertError } = await supabase
          .from("users")
          .insert({
            name: name,
            email: email,
            password: password, // Store the plain password (consider using Supabase Auth for better security)
            usertype: role,
          })
          .select() // Use select to retrieve inserted data
          .single();

        if (insertError) throw insertError;

        const userId = userData.user_id; // Retrieve the USER_ID from the inserted data

        // Add client or freelancer-specific data
        if (role === "client") {
          const { error: insertClientError } = await supabase
            .from("clients")
            .insert({
              user_id: userId, // Use the USER_ID from the Users table
              company_name: companyName, // Use the company name provided
            });

          if (insertClientError) throw insertClientError;
        } else if (role === "freelancer") {
          const { error: insertFreelancerError } = await supabase
            .from("freelancers")
            .insert({
              user_id: userId, // Use the USER_ID from the Users table
              skills: skills, // Required for freelancer
              experience_level: experienceLevel, // Experience level added
            });

          if (insertFreelancerError) throw insertFreelancerError;
        }

        router.push(`/${role}-dashboard`); // Redirect to appropriate dashboard
      }
    } catch (error) {
      console.error("Error:", error); // Log error to console for debugging
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">{isLogin ? "Login" : "Signup"}</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p className="text-blue-500 mb-4">Processing...</p>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-300">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none"
                >
                  <option value="client">Client</option>
                  <option value="freelancer">Freelancer</option>
                </select>
              </div>

              {role === "client" && (
                <div className="mb-4">
                  <label className="block text-lg font-medium text-gray-300">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none"
                    required
                  />
                </div>
              )}

              {role === "freelancer" && (
                <>
                  <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-300">Skills</label>
                    <input
                      type="text"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-300">Experience Level</label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none"
                      required
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </>
              )}
            </>
          )}

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className={`bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:underline"
          >
            {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
