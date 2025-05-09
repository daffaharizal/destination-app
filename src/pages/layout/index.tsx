import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function MainLayout() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const handleClickNavigateToSetting = () => {
    navigate("setting");
  };

  return (
    <>
      <Outlet />
      <button onClick={handleClickNavigateToSetting}>
        Navigate To Setting
      </button>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
