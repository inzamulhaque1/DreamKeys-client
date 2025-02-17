import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { useEffect, useState } from "react";

const MainLayout = () => {

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
      }, [theme]);
    
      const toggleTheme = () => {
        setTheme((prevTheme) => {
          const newTheme = prevTheme === "light" ? "dark" : "light";
          return newTheme;
        });
      };
      
    


    return (
        <div>
            <Navbar toggleTheme={toggleTheme} theme={theme} ></Navbar>
            <Outlet context={{ theme, toggleTheme }}></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;