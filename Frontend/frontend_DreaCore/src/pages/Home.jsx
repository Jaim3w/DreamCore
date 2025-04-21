import React from "react";

//Importo el fondo desde la carpeta "assets"
import fondo from "../assets/fondohome.jpg";

const Home = () => {
    return (
        //Img que va en todo el home
        <img src={fondo} alt="Fondo" style={{ width: '100%', height: 'auto' }} />
    );
};

export default Home;