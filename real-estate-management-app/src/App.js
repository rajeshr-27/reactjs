
import 'bootstrap/dist/css/bootstrap.min.css';
import Header  from './components/Header';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Properties from './components/Properties';
import PropertyFrm from './components/PropertyFrm';
import Home from './components/Home';
import {Provider} from "react-redux";
import store from "./redux/app/store"



function App() {
  return (
    <Provider store={store} >
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<Home />} />
            <Route path='/properties' element={<Properties />} />
            <Route path='/property-frm' element={<PropertyFrm />} />
            <Route path='/property-frm/:id' element={<PropertyFrm />} />
          </Route>
        </Routes>
      </Router>
    </div>
    </Provider>
  );
}

export default App;
