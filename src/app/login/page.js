"use client"; // Required for client-side interactivity

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient"; // Import the Supabase client

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Set loading to true when the request starts

    try {
      if (isLogin) {
        // User Login
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) throw loginError; // Throw the login error

        console.log("User logged in:", data.user);
        router.push("/client-dashboard"); // Redirect to the dashboard
      } else {
        // User Signup
        const { data, error: signupError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signupError) throw signupError; // Throw the signup error

        console.log("User signed up:", data.user);
        router.push("/client-dashboard"); // Redirect after successful signup
      }
    } catch (error) {
      setError(error.message); // Set the error message to state
    } finally {
      // Reset the form and loading state
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">{isLogin ? "Login" : "Signup"}</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error messages */}
        {loading && <p className="text-blue-500 mb-4">Processing...</p>} {/* Loading feedback */}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className={`bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Processing..." : (isLogin ? "Login" : "Signup")}
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
