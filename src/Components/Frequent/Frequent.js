import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const Data = [
  {
    question: "Is this a good product?",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui facere in labore maxime assumenda iure sed tenetur alias omnis eveniet similique laborum, neque porro unde ducimus officiis animi vitae! Quidem.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui facere in labore maxime assumenda iure sed tenetur alias omnis eveniet similique laborum, neque porro unde ducimus officiis animi vitae! Quidem.",
  },
  {
    question: "Is this a good product?",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui facere in labore maxime assumenda iure sed tenetur alias omnis eveniet similique laborum, neque porro unde ducimus officiis animi vitae! Quidem.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui facere in labore maxime assumenda iure sed tenetur alias omnis eveniet similique laborum, neque porro unde ducimus officiis animi vitae! Quidem.",
  },
];

const Frequent = () => {
  const [openQuestions, setOpenQuestions] = useState([0]);

  const handleToggle = (index) => {
    if (openQuestions.includes(index)) {
      setOpenQuestions(openQuestions.filter((i) => i !== index));
    } else {
      setOpenQuestions([...openQuestions, index]);
    }
  };

  return (
    <div className="w-[50%] m-3 p-4 bg-blue-100 text-center rounded-md">
      <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
      {Data.map((item, index) => (
        <div key={index}>
          <div className="flex flex-row justify-between my-3">
            <h3 className="font-semibold font-xl">{item.question}</h3>
            {openQuestions.includes(index) ? (
              <button><Minus onClick={() => handleToggle(index)} className="border-2 border-red-800 text-red-700 mx-2 hover:text-white hover:bg-red-600 hover:border-red-500 duration-300 " /></button>
            ) : (
              <button><Plus onClick={() => handleToggle(index)} className="border-2 border-blue-800 text-blue-800 mx-2 hover:text-white hover:bg-blue-600 hover:border-blue-500 duration-300 " /></button>
            )}
          </div>
          {openQuestions.includes(index) && (
            <p className="text-left ml-1 text-gray-700">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Frequent;
