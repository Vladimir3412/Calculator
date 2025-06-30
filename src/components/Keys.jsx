import React from "react";

// Принимаем props: label (текст кнопки),
//  keyClass (флаг для кнопки "="),
//  onButtonClick (функция обработки нажатия),
// передаваемые из Calculator.jsx
const Keys = ({ label, keyClass, onButtonClick }) => {
  // класс, для кнопки "равно", если keyClass true, а он true
  const equalClass =
    "col-[span_2] bg-[#4ccdc6] text-[#1a261a] font-semibold hover:bg-[#4CCDC6]";

  return (
    <div
      // стили для кнопок
      className={`bg-[#141414] flex cursor-pointer items-center justify-center p-4 rounded-[5px] hover:bg-[#4CCDC6]
       ${keyClass && equalClass} `} // Добавляем дополнительный класс equalClass,
      // если keyClass = true (для кнопки "=")

      // при клике вызываем функцию onButtonClick с label
      onClick={() => onButtonClick(label)}
    >
      {label}
    </div>
  );
};

export default Keys;
