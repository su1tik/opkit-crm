import { useState } from "react";
import { Auth } from "./components/Auth";
import { Dashboard } from "./components/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );

  return (
    <div className="App">
      {!isAuthenticated ? (
        <Auth onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;
