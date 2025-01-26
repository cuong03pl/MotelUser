import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { Fragment } from "react";
import ManageLayout from "./layouts/ManageLayout/ManageLayout";

function App() {
  return (
    <div className="bg-[#f1f5f9]">
      <Routes>
        {publicRoutes.map((route, index) => {
          let Comp = route.component;
          let Layout = DefaultLayout;
          if (route.layout === null) {
            Layout = Fragment;
          } else if (route.manage === true) {
            Layout = ManageLayout;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={<Layout>{Comp}</Layout>}
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
