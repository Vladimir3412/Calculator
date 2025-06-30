import React, { useState } from "react";
import Keys from "./Keys";
import { toast, ToastContainer } from "react-toastify";

const Calculator = () => {
  const keys = [
    "AC",
    "C",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    ".",
    "0",
    "Равно",
  ];
  // Состояние для контроля отображения стиля результата.
  // false — не отображаем ввод, true — отображаем результат крупно
  const [showResult, setShowResult] = useState(false);

  // Состояние, хранящее текущую строку ввода калькулятора
  const [display, setDisplay] = useState("");
  const maxLimit = 15;

  // Функция для вычисления результата на основе текущего ввода
  function calculateResult() {
    if (display.length !== 0) {
      try {
        // Используем eval для вычисления строки как математического выражения
        let calcResult = eval(display);

        // Округляем результат до 3 знаков после запятой и делаем числом
        calcResult = parseFloat(calcResult.toFixed(3));

        // Выводим результат на экран калькулятора
        setDisplay(calcResult);

        // Переключаем состояние, чтобы отобразить результат крупным стилем
        setShowResult(true);
      } catch (error) {
        setDisplay("Error");
      }
      // Если строка пуста, оставляем display пустым
    } else setDisplay("");
  }

  // Функция обработки нажатия кнопок
  function handleButton(value) {
    // При каждом нажатии скрываем крупное отображение результата
    setShowResult(false);
    // Если нажата кнопка "AC", очищаем display
    if (value === "AC") setDisplay("");
    // Если нажата кнопка "C", удаляем последний символ из display
    else if (value === "C") setDisplay(display.slice(0, -1));
    // Если нажата кнопка оператора (*, /, %)
    else if (isOperator(value)) {
      // Если строка пуста (display) или последний символ уже оператор — игнорируем ввод
      if (display == "" || isOperator(display[display.length - 1])) return;

      // Иначе Добавить к текущему вводу display новую нажатую кнопку value,
      // чтобы построить строку выражения для калькулятора."
      setDisplay(display + value);

      // Если нажата кнопка "Равно" — вычисляем результат
    } else if (value === "Равно") calculateResult();
    // если лимит символов превышен, выводим ошибку
    else if (display.length >= maxLimit) {
      toast.error(`Максимальное количество допустимых символов: ${maxLimit}`);
      // и очищаем display
      setDisplay("");

      // Для всех остальных кнопок (цифры, +, -, .) добавляем их к строке ввода
    } else setDisplay(display + value);
  }

  function isOperator(char) {
    return ["*", "/", "%"].includes(char);
  }

  // Стиль для отображения строки ввода мелким серым текстом
  const operationClass =
    "text-[1.2rem] tracking-[2px] flex gap-[5px] items-center text-[rgba(255,255,255,0.5)] justify-end";
  // Стиль для отображения результата крупным текстом
  const resultClass = "text-[1.7rem]";

  return (
    // Главный компонент калькулятора
    <div className="min-w-[320px] bg-black flex flex-col gap-4 p-4 rounded-2xl">
      <div
        className="overflow-x-auto bg-[#141414] min-h-[100px] 
    flex items-end justify-end flex-col p-4 rounded-[10px]"
      >
        <div className={`${showResult ? resultClass : operationClass} `}>
          {display}
        </div>
      </div>
      <div className="grid grid-cols-[repeat(4,1fr)] gap-[0.3rem]">
        {keys.map((item, index) => (
          <Keys
            label={item}
            key={index}
            keyClass={item === "Равно" && "равно"}
            onButtonClick={handleButton}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
