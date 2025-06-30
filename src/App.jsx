import React from "react";
import Calculator from "./components/Calculator";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    // наш главнцй компонент приложения
    // в нем мы будем использовать компонент Calculator
    // и ToastContainer для отображения уведомлений
    <div className="bg-[#141414] min-h-screen flex items-center justify-center text-white">
      <Calculator />
      <ToastContainer
        position="top-right"
        theme="dark"
        autoClose={2000}
        closeOnClick
        draggable
      />
    </div>
  );
};

export default App;
