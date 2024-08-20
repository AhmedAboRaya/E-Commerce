import { Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";

let calcNumber = 0;

const CounterUE = () => {
  const [number, setNumber] = useState(0);
  const [calcNumber, setCalcNumber] = useState(0);

  useEffect(() => {
    setCalcNumber(number * 2);
  }, [number]);

  const handlePlusClick = () => {
    setNumber(number + 1);
  };
  const handleMinusClick = () => {
    if (number > 0) setNumber(number - 1);
  };

  return (
    <div className="border-2 border-black m-3 p-7 flex flex-col justify-center w-[50%] items-center rounded-md">
      <h1 className="text-2xl center my-4">{number}</h1>
      <div className="flex flex-row">
        <button>
          <Plus
            className="border-2 border-blue-800 text-blue-800 mx-2 hover:text-white hover:bg-blue-600 hover:border-blue-500 duration-300 "
            onClick={handlePlusClick}
          />
        </button>
        <button>
          <Minus
            className="border-2 border-red-800 text-red-700 mx-2 hover:text-white hover:bg-red-600 hover:border-red-500 duration-300 "
            onClick={handleMinusClick}
          />
        </button>
      </div>
      <div>{calcNumber}</div>
    </div>
  );
};

export default CounterUE;
