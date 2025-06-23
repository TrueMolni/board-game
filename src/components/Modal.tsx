import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCloseBackdrop: (e: React.MouseEvent<HTMLDivElement>) => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onCloseBackdrop,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onCloseBackdrop}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 modal"
    >
      <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4 border border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        <div className="text-gray-300 leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
