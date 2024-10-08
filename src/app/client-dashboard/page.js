"use client";

export default function ClientDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 flex">
      <aside className="w-64 bg-gray-800 shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white">Client Dashboard</h2>
          <nav className="mt-4">
            <a href="/post-project" className="block text-gray-300 py-2 hover:bg-gray-700">Post Project</a>
            <a href="/view-projects" className="block text-gray-300 py-2 hover:bg-gray-700">View Projects</a>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-white mb-4">Welcome, Client!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-white">Posted Projects</h2>
            {/* Add more content here */}
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-white">Statistics</h2>
            {/* Add more content here */}
          </div>
        </div>
      </main>
    </div>
  );
}
