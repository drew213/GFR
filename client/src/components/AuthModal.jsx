import React, { useState } from "react";

const AuthModal = ({ close }) => {
  const [isLogin, setIsLogin] = useState(true); // To toggle between login and registration
  const [error, setError] = useState(""); // To store error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error messages on new submission

    const url = isLogin ? "/api/login" : "/api/register";
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Assuming backend sends error details in JSON
        throw new Error(errorData.message || "An error occurred");
      }

      const result = await response.json();
      console.log(result); // Handle success (e.g., store tokens, redirect)
      close(); // Close modal on success
    } catch (error) {
      console.error("Failed to submit form:", error);
      setError(error.message); // Display error message from catch block
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg relative">
        <h2 className="text-2xl mb-2">{isLogin ? "Login" : "Register"}</h2>
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Display error message */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="border p-2 mb-2 w-full"
            />
          )}
          <input
            name="username"
            type="text"
            placeholder="Username"
            required
            className="border p-2 mb-2 w-full"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="border p-2 mb-4 w-full"
          />
          <div className="flex justify-between items-center mb-2">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              {isLogin ? "Log In" : "Register"}
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="underline"
            >
              {isLogin
                ? "Need an account? Register"
                : "Have an account? Log In"}
            </button>
          </div>
        </form>
        <button onClick={close} className="absolute top-0 right-0 m-2">
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
