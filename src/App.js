import './App.css';
import ListTask from './containers/ListTasks';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <ListTask />
    </Provider>
  );
}

export default App;
