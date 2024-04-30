import logo from './logo.svg';
import './App.css';
import ChatRoom from './components/ChatRoom'
import {Provider} from 'react-redux';
import store from './redux/app/store'

function App() {
  return (
    <div className="App">
      <Provider store={store} >
        <ChatRoom />
      </Provider>
    </div>
  );
}

export default App;
