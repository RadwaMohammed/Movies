import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const NotFound = () => {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate("/");
  };
  return (
    <>
      <Header />

      <main className="container not-found text-center">
        <p className="fs-3">صفحة غير موجودة</p>
        <button className="btn mt-1" onClick={() => redirectToHome()}>
          الصفحة الرئيسية
        </button>
      </main>
    </>
  );
};

export default NotFound;
