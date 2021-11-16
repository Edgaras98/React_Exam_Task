import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Spinner from "./Components/Spinner/Spinner.styled";

//Lazy imports

const Register = React.lazy(() =>
  import("./Components/Pages/Register/Register.styled")
);
const Login = React.lazy(() => import("./Components/Pages/Login/Login.styled"));
const Home = React.lazy(() => import("./Components/Pages/Home/Home.styled"));
const Add = React.lazy(() => import("./Components/Pages/Add/Add.styled"));
const PrivateRoute = React.lazy(() => import("./PrivateRoute/PrivateRoute"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              exact
              path="/add"
              element={
                <PrivateRoute>
                  <Add />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
