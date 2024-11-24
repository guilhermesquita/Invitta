import { useContext } from "react";
import ContextMessages from "../_context/ContextMessages";

const useMessages = () => useContext(ContextMessages);
export default useMessages;
