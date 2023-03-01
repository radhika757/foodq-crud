import styles from "./Modal.module.css";
import { Fragment } from "react";
// For react portals
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      {/* Below div will be the actual content passed between  the model opening and closing */}
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

// helper constant
const portal = document.getElementById("overlays");

// Main component that is being exported, which will have back-drop and overlay side-by-side
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portal)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portal
      )}
    </Fragment>
  );
};

export default Modal;
