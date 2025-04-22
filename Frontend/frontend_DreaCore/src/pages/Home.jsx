import React from "react";
import fondo from "../assets/fondohome.jpg";

const Home = () => {
  return (
    <div style={{ width: '100%', minHeight: '100vh', overflow: 'auto' }}>
      <img
        src={fondo}
        alt="Fondo"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </div>
  );
};

export default Home;
