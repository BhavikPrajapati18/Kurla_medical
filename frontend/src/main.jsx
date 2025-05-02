import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "../src/store/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AboutUs from "./pages/AboutUs.jsx";
import Store from "./pages/Store.jsx";
import Home from "./pages/Home.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Login from "./pages/Login.jsx";
import Signin from "./pages/Signin.jsx";
import { Cart, AuthLayout } from "./components";
import SingleProduct from "./pages/SingleProduct.jsx";
import UserOption from "./pages/UserOption.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";
import Shipping from "./pages/Shipping.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/signin"
        element={
          <AuthLayout authentication={false}>
            <Signin />
          </AuthLayout>
        }
      />
      <Route
        path="/store"
        element={
          <AuthLayout authentication>
            <Store />
          </AuthLayout>
        }
      />
      <Route
        path="/about"
        element={
          <AuthLayout authentication>
            <AboutUs />
          </AuthLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <AuthLayout authentication>
            <ContactUs />
          </AuthLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <AuthLayout authentication>
            <Cart />
          </AuthLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthLayout authentication>
            <UserOption />
          </AuthLayout>
        }
      />
      <Route
        path="/update"
        element={
          <AuthLayout authentication>
            <UpdateProfile />
          </AuthLayout>
        }
      />
      <Route
        path="/change-password"
        element={
          <AuthLayout authentication>
            <UpdatePassword />
          </AuthLayout>
        }
      />
      <Route
        path="/shipping"
        element={
          <AuthLayout authentication>
            <Shipping />
          </AuthLayout>
        }
      />
      <Route path="/product/:id" element={<SingleProduct />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
