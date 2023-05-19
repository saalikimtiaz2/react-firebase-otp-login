import { lazy, Suspense } from "react";
import { TailSpin } from "react-loader-spinner";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Login = lazy(() => import("../pages/Login"));

function Routers() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="tw-h-screen tw-w-screen tw-flex tw-items-center tw-justify-center tw-bg-primary">
            <TailSpin width={100} height={100} color="#fff" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Routers;
