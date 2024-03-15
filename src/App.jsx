import AuthPage from "./pages/AuthPage";
import ProfilePage from './pages/ProfilePage';
import store from './store';

import useLocalStorage from "use-local-storage";
import { AuthContext } from "./feature/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

export default function App() {

  const [authToken, setAuthToken] = useLocalStorage("authToken", null)

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="*" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthContext.Provider>
  )
}
