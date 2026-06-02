import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Feed from "./pages/Feed";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Protected from "./component/Protected";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Feed />
            </Protected>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
