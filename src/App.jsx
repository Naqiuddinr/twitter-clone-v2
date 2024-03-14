import AuthPage from "./pages/AuthPage";
import ProfilePage from './pages/ProfilePage';

import useLocalStorage from "use-local-storage";
import { AuthContext } from "./feature/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {

  const [authToken, setAuthToken] = useLocalStorage("authToken", null)

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
