import './App.css';
import Histogram from './components/histogram';

function App() {
  const data = [{price: 15}, {price: 20}, {price: 250}]
  return (
    <div>
      <Histogram data={data}/>
    </div>
  );
}

export default App;
