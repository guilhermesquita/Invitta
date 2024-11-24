// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useContext } from "react";
import ContextEvent from "../_context/ContextEvent";

const useEvent = () => useContext(ContextEvent);
export default useEvent;
