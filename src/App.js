import Counter from './Components/Counter/Counter';
import CounterUE from './Components/CounterUE/CounterUE';
import Frequent from './Components/Frequent/Frequent';

function App() {
  return (
    <div className='flex flex-col items-center'>
      <Counter />
      <Frequent />
      <CounterUE />
    </div>
  );
}

export default App;