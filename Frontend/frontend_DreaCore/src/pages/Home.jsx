import React from "react";
import fondo from "../assets/fondohome.jpg";

const Home = () => {
    return (
        <img src={fondo} alt="Fondo" style={{ width: '100%', height: 'auto' }} />
    );
};

export default Home;