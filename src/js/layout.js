import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import { SinglePlanet } from "./views/singlePlanet";
import { SingleVehicles } from "./views/singleVehicles";
import { Persons } from "./views/Persons";
import { Planets } from "./views/Planets";
import { Vehicles } from "./views/Vehicles";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import "bootstrap-icons/font/bootstrap-icons.css";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/persons" element={<Persons />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/single/person/:uid" element={<Single />} />{" "}
            <Route path="/single/planet/:uid" element={<SinglePlanet />} />{" "}
            <Route path="/single/vehicle/:uid" element={<SingleVehicles />} />{" "}
            <Route path="*" element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
