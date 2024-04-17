import React,{useState, useEffect} from 'react';
import axios from 'axios';

const AuthService = {
	login:(token) =>  {
		localStorage.setItem('token',token)
	},
	logout:() => {
		localStorage.removeItem('token');
	},
	isAuthenticated: ()  => {

		return localStorage.getItem('token') !== null;
		/*const user = AuthContext();
		return user;
		return localStorage.getItem('token') !== null*/
	}
}

function AuthContext() {
	const [user, setUser] = useState([]);

	const fetchData = async () => {
		await axios.post(window.API_URL+'/users/current',[], {headers:{ Authorization: `Bearer ${localStorage.getItem('token')}`}}).then((response)=>{
			setUser(response.data.user);
		}).catch((error)=>{
			console.log(error.response.data.message);
		})
	} 

}
export default AuthService;