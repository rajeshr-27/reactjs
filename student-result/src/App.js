import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import ClassList from './components/ClassList';
import ClassFrm from './components/ClassFrm';
import SubjectList from './components/SubjectList';
import SubjectFrm from './components/SubjectFrm';
import StudentList from './components/StudentList';
import StudentFrm from './components/StudentFrm';
import MarkFrm from './components/MarkFrm';
import MarkList from './components/MarkList';
import Result from './components/Result';
import UserFrm from  './components/UserFrm';
import Users from './components/Users'
import UserLogin from './components/UserLogin';
import ProtectedRoute from './components/ProtectedRoute';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
window.APP_URL = 'http://localhost:3000';

window.API_URL = 'http://localhost:5001/api';
window.API_IMG_URL = 'http://localhost:5001/uploads';

function App() {
  return (
    <div>
    <ToastContainer />
    <Provider store={store} >
        <Router>
            <Routes>
                <Route path="/" element={<Header />}>                    
                    <Route path="/result" element={<Result />} />                    
                    <Route path="/user-login" element={<UserLogin />} />   
                     <Route path="/user-frm" element={<UserFrm />} />             
                    <Route exact path='/' element={<ProtectedRoute/>}>
                         <Route path="/class-list" element={<ClassList />} />
                        <Route path="/class-frm" element={<ClassFrm />} />
                        <Route path="/class-frm/:id" element={<ClassFrm />} />
                        <Route path="/subject-list" element={<SubjectList />} />
                        <Route path="/subject-frm" element={<SubjectFrm />} />
                        <Route path="/subject-frm/:id" element={<SubjectFrm />} />
                        <Route path="/student-list" element={<StudentList />} />
                        <Route path="/student-frm" element={<StudentFrm />} />
                        <Route path="/student-frm/:id" element={<StudentFrm />} />
                        <Route path="/mark-list" element={<MarkList />} />
                        <Route path="/mark-frm" element={<MarkFrm />} />
                        <Route path="/mark-frm/:id" element={<MarkFrm />} />
                        <Route exact path='/users' element={<Users />}/>
                       
                        <Route path="/user-frm/:id" element={<UserFrm />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    </Provider>
    </div>
  );
}

export default App;
