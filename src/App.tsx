import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Home from "./components/organisms/Home";
import Cars from "./components/organisms/Cars";
import Signup from "./components/organisms/Signup";
import Login from "./components/organisms/Login";
import { AuthProvider } from "./context/auth/AuthContext";
import MyBookings from "./components/organisms/MyBookings";
import { AlertProvider } from "./context/alert/AlertContext";
import { FilterProvider } from "./context/FilterContext";
import CarDetails from "./components/molecules/CarSelection/CarDetails";
import CarBooking from "./components/organisms/CarBooking";
import Layout from "./components/organisms/Layout";
import Profile from "./components/molecules/edit-profile-components/Profile";
import Dashboard from "./components/organisms/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AlertProvider>
          <FilterProvider>
            <AppRoutes />
          </FilterProvider>
        </AlertProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Home shown at '/' */}
          <Route path="cars" element={<Cars />} />
          <Route path="cars/car-info/:carId" element={<CarDetails />} />
          
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="car-bookings" element={<CarBooking />} />
          <Route path="edit-bookings/:bookingId" element={<CarBooking />} />
          <Route path="my-profile" element={<Profile/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
        </Route>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Routes>

      {/* Modal-style rendering support (optional) */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/cars/car-info" element={<CarDetails />} />
        </Routes>
      )}
    </>
  );
}


export default App;
