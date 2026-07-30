import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {

  const navigate = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => {

      navigate("/result");

    }, 2000);

    return () => clearTimeout(timer);

  }, []);

  return (
    <div className="bg-black min-h-screen flex items-center justify-center text-white text-3xl">
      Generating AI Travel Plan...
    </div>
  );
}