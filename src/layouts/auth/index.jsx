import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import ToastMessage from "components/toast/ToastMessage";
import { authSignIn } from "constants/routeConstant";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "routes.js";

export default function Auth() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = "ltr";
  return (
    <div className="overflow-hidden">
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <FixedPlugin />
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full">
              <div className="mb-auto flex flex-col lg:flex-row ">
                {/* <div className="mx-auto flex h-fit w-fit items-center hover:cursor-pointer">
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.70994 2.11997L2.82994 5.99997L6.70994 9.87997C7.09994 10.27 7.09994 10.9 6.70994 11.29C6.31994 11.68 5.68994 11.68 5.29994 11.29L0.709941 6.69997C0.319941 6.30997 0.319941 5.67997 0.709941 5.28997L5.29994 0.699971C5.68994 0.309971 6.31994 0.309971 6.70994 0.699971C7.08994 1.08997 7.09994 1.72997 6.70994 2.11997V2.11997Z"
                      fill="#A3AED0"
                    />
                  </svg>
                </div> */}
                {/* toast message */}
                <div className="w-screen lg:w-[51vw]">
                  <ToastMessage />
                  <Routes>
                    {getRoutes(routes)}
                    <Route
                      path="/"
                      element={<Navigate to={authSignIn} replace />}
                    />
                  </Routes>
                </div>
                <div
                  className="hidden min-h-screen flex-col items-center 
                 justify-center gap-6
                 bg-[#0360D94D] bg-cover bg-center px-[53px] md:hidden lg:flex lg:w-[49vw] 2xl:w-[50vw]"
                >
                  <img className="h-[131px] w-[568px]" src="/9job-logo.png" />
                  <span className="text-black text-center text-[32px] font-bold">
                    {"Nhanh tìm việc - Vững tương lai"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
