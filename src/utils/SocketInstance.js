import { io } from "socket.io-client";
import { BASE_URL } from "./constant";

const SocketInstance = io.connect(BASE_URL)

export default SocketInstance;