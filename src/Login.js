import React, { useState } from "react";

const storedUser = { username: "admin", password: "1234" }; // Pre-stored credentials

export default function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === storedUser.username && password === storedUser.password) {
      localStorage.setItem("user", JSON.stringify(storedUser)); // Store session
      setIsAuthenticated(true);
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="container-fluid bg-dark">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-4 col-xl-4">
          <div className="mb-4 text-center">
            <a class="navbar-brand" href="#">
              <img src="images/logo.png" height="200" />
            </a>
          </div>
          <div className="card p-4 text-center text-light border border-warning bg-dark">
            <h2 className="mb-3">Login</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input type="text" className="form-control form-control-lg" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control form-control-lg" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-warning w-100 btn-lg">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
