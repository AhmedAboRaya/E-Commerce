import Counter from "../Counter/Counter";
import CounterUE from "../CounterUE/CounterUE";
import Frequent from "../Frequent/Frequent";
import DisplayUsers from "../Users/DisplayUsers";

const Lab16 = () => {
  return (
    <div className="flex flex-col items-center">
      <DisplayUsers />
      <Counter />
      <Frequent />
      <CounterUE />
    </div>
  );
};

export default Lab16;
