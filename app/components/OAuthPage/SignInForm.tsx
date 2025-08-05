const SignInForm = () => {
  return (
    <form className="space-y-4 font-body">
      <div>
        <label htmlFor="email" className="block mb-1 text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentTeal text-neutralBlack hover:shadow-soft-orange hover:shadow-md"
          placeholder="Email address"
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentTeal text-neutralBlack hover:shadow-soft-orange hover:shadow-md"
          placeholder="Password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primaryPurple hover:bg-bright-magenta hover:shadow-md hover:shadow-primary-purple text-black font-semibold py-3 rounded-lg transition"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
