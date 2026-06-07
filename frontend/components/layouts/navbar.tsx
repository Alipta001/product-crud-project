import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            A
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Panel
          </h1>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 bg-transparent outline-none w-72"
          />
          <button className="bg-indigo-600 text-white px-5 py-2 hover:bg-indigo-700 transition-all">
            Search
          </button>
        </div>

        {/* Navigation */}
        <div>
          <ul className="flex items-center gap-4">
            <li>
              <Link
                href="/addProduct"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all font-medium"
              >
                Create Product
              </Link>
            </li>

            <li>
              <Link
                href="/home"
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all font-medium"
              >
                All Products
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}