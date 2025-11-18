import React from "react";
import { Link } from "react-router-dom";
const HomePage: React.FC = () => {
    return (
        <>
            <h1>Welcome to the Blog! <Link to={{
                pathname: "/login",
            }}>Click to login</Link></h1>;
        </>
    );
}

export default HomePage;