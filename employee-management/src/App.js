import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import EmployeeView from './components/EmployeeView';
import EmployeeFrm from './components/EmployeeFrm';
import store from './redux/app/store';
import {Provider} from 'react-redux';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
window.APP_URL = "http://localhost:3000";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/" element={<Header />} >
                  <Route path="/employee-list" element={<EmployeeList />} />  
                  <Route path="/employee-view" element={<EmployeeView />} />  
                  <Route path="/employee-view/:id" element={<EmployeeView />} />  
                  <Route path="/employee-frm" element={<EmployeeFrm />} />  
                  <Route path="/employee-frm/:id" element={<EmployeeFrm />} />  
                </Route>
            </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
