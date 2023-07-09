import fetchProducts from './services/fetchProducts';

import './App.css';
import Search from './components/Search/Search.component';
import { PRODUCTS } from './helpers/constants';

const App = () => {
  return (
    <div className="App">
      <header className="App-container">
        <Search label={PRODUCTS} fetchItems={fetchProducts} />
      </header>
    </div>
  );
}

export default App;
