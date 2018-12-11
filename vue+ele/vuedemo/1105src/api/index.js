import axios from "axios";
import qs from "qs";
const baseURL = "http://localhost:8080"
const headers = {headers:{"content-type":"application/x-www-form-urlencoded"}};
export default {
	add(data){
		data = qs.stringify(data);
		return axios.post(baseURL+"/add",data,headers)
	},
	get(){
		return axios.get(baseURL+"/goods")
	}
}

