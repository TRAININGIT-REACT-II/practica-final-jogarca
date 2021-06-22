import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

import "./css/Modal.css";

const Modal = ({ children, show, onClose }) => {
  const modalRef = useRef(null);
  const modalGroupRef = useRef(document.getElementById("modals"));

  useEffect(() => {
    const modalEl = document.createElement("div");
    modalEl.classList.add("modal-hidden");

    modalGroupRef.current.appendChild(modalEl);
    modalRef.current = modalEl;

    return () => modalGroupRef.current.removeChild(modalRef.current);
  }, []);

  useEffect(() => {
    if (modalRef.current != null) {
      if (show) {
        modalRef.current.classList.remove("modal-hidden");
      } else {
        modalRef.current.classList.add("modal-hidden");
      }
    }
  }, [show]);

  if (show && modalRef.current != null) {
    return createPortal(
      <div role="dialog" aria-modal="true">
        <div className="modal-background" onClick={onClose} />
        <div className="modal">
          <button
            className="modal-close outline"
            aria-label="Cerrar"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>,
      modalRef.current
    );
  } else {
    return null;
  }
};

export default Modal;
