import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  // we use useRef to create a div element that we can reference on every single render of the modla component
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    // this inserts our reference div into the dom as a child of our modal div in index.html
    modalRoot.appendChild(elRef.current);
    //this is weird but we are returning a function to remove the reference div from the dom (the child) to avoid memory leaks
    // a function returned in a useEffect is called when the component unmounts, hence why it is used for clean ups
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  //the below code is returning a div with our props (children) and the reference div
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;