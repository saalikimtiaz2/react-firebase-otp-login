import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";

import { ToastContainer } from "react-toastify";

import Routers from "./routers";

function App() {
  return (
    <>
      <ToastContainer />
      <Routers />
    </>
  );
}

export default App;
