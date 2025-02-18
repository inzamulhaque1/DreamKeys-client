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
        <div className="bg-gray-50 dark:bg-[#0B0716] ">
            <Navbar toggleTheme={toggleTheme} theme={theme} ></Navbar>
            <Outlet context={{ theme, toggleTheme }}></Outlet>
            <Footer theme={theme} ></Footer>
        </div>
    );
};

export default MainLayout;