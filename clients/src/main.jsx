import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.jsx';
import AuthProvider from "./context/authContext.jsx";

// Create the root and render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
  <App />
  </AuthProvider>
);
