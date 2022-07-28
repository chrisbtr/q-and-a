import axios from "axios";

// NOTE: If you wish to use the Expo Go app then use your actual IP address. 
// For example http://192.168.1.234:5000/ and not http://localhost:5000/
const entryPointUrl = "http://<your IP address>:5000/";

export default axios.create({ baseURL: entryPointUrl });
