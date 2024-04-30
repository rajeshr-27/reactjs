import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import RestaurantFrm from './components/RestaurantFrm'
import RestaurntList from './components/RestaurantList';
import {Provider} from "react-redux";
import store from "./redux/app/store";
function App() {
  return (
    <div className="App">
      <Provider store={store} >
        <Router>
          <Routes>
              <Route path="/" element={<Header />} >
                <Route path="restaurant-frm" element={<RestaurantFrm />} />
                <Route path="restaurant-frm/:id" element={<RestaurantFrm />} />
                 <Route path="restaurant-list" element={<RestaurntList />} />
                 <Route path="/" element={<RestaurntList />} />
              </Route>
          </Routes>

        </Router>
      </Provider>
    </div>
  );
}

export default App;
