import axios from "axios";

const entryPointUrl = "http://192.168.0.21:5000/";

export default axios.create({ baseURL: entryPointUrl });
