import React from "react";

const SignIn: React.FC = () => {
  return (
    <div className="">
      <div className="w-96 bg-[#232323] rounded-lg shadow-xl p-6 ">
        <h2 className="text-2xl font-bold mb-2 text-center text-white">
          Sign In
        </h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm text-white bg-white/10 focus:outline-none focus:ring-0" // Removed outline and focus ring on focus
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2  border-gray-300 rounded-md shadow-sm text-white bg-white/10 focus:outline-none focus:ring-0" // Removed outline and focus ring on focus
            />
          </div>
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
