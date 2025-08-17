import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FileProvider } from "./Context/FileContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./Context/UserContext.jsx";
import { ChatProvider } from "./Context/ChatContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <ChatProvider>
      <FileProvider>
        <BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
          />
          <App />
        </BrowserRouter>
      </FileProvider>
    </ChatProvider>
  </UserProvider>
);
