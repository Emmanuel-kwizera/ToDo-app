import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasword() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      // Implement login logic here
      console.log('Reset submitted', { email });
    };

  return (
    <div className="lg:w-6/12 w-9/12 flex flex-wrap justify-center bg-white border border-transparent rounded-md shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6 w-9/12">
            
            <h2 className="mt-6 text-[#1F2F4F] text-center text-3xl font-extrabold text-gray-900">
              Sign in to your Password
            </h2>
      
            <div>
                <label htmlFor="email" className="block text-sm text-[--gray-900] font-medium">
                    Email address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            
            <div className="flex flex-wrap justify-center">
                <button
                    type="submit"
                    className="w-9/12 text-center text-lg py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#F8A51B] hover:bg-bg-[#F8A51B] focus:outline-none "
                >
                    Reset
                </button>
            </div>
            
            <div>
                <p className="text-[--gray-900] text-sm">
                    Don't need the service?{" "}
                    <Link to="/">
                        <span className="text-[#242E8F] font-semibold">Back to Login</span>
                    </Link>
                </p>
            </div>
        </form>
    </div>
  )
}
