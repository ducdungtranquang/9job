import { Loader } from "@mantine/core";
import { useSelector } from "react-redux";

const OverlayLoading = ({ children }) => {
  const { isLoading } = useSelector((state) => state.overlay);

  if (!isLoading) return null;
  return (
    <div className="absolute top-0 right-0 left-0 bottom-0 z-[99999] flex h-screen w-screen items-center justify-center bg-[rgba(255,255,255,0.5)]">
      <div>
        <Loader color="#422AFB" size={30} />;
      </div>
    </div>
  );
};

export default OverlayLoading;
