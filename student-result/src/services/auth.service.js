import axios from 'axios';
const API_URL = 'http://localhost:5001/api/users';


const login = (email, password) => {

	return axios
	.post(API_URL+'/login',{email,password})
	.then((response)=>{
		if(response.data.status == 1) {
			localStorage.setItem("token",response.data.token)
			localStorage.setItem("user",JSON.stringify(response.data.user))
		}
		return response.data.user;
	});

};

const AuthService = { login};

export default AuthService;