import React, { ReactNode, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai"; 
import { Link } from "react-router-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside, isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white flex flex-col justify-center items-center max-w-3xl  w-full p-6 rounded-lg shadow-lg"
      >
        <div className="flex justify-between items-center mb-4 w-full">
          <Link
            to="/"
            className="text-2xl font-bold text-black text-start px-5 sm:mb-0 flex w-full"
          >
            M<span className="text-violet-500">auson</span>
          </Link>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <AiOutlineClose className="w-6 h-6" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
//clear