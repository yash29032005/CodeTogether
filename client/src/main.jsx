import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { OutputProvider } from "./Context/OutputContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./Context/UserContext.jsx";
import { ChatProvider } from "./Context/MessageContext.jsx";
import { EditorSettingsProvider } from "./Context/EditorsettingsContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <ChatProvider>
      <OutputProvider>
        <BrowserRouter>
          <EditorSettingsProvider>
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              pauseOnHover
            />
            <App />
          </EditorSettingsProvider>
        </BrowserRouter>
      </OutputProvider>
    </ChatProvider>
  </UserProvider>
);
