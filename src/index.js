// index.js
import OverlayLoading from "components/OverlayLoading";
import ReactDOM from "react-dom/client";
import 'react-quill/dist/quill.snow.css';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <Router>
       <OverlayLoading />
        <App />
      </Router>
    </Provider>
  // </React.StrictMode>
)
