import React from 'react';
import { XCircle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showCancel?: boolean;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCancel = true,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  onConfirm,
  className = ''
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 max-w-md w-full max-h-[90vh] overflow-y-auto ${className}`}>
        {/* Header */}
        <div className="p-8 pb-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-2xl font-black text-slate-800">{title}</h3>
<button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-all hover:scale-110"
            aria-label="Close modal"
          >
            <XCircle size={28} className="text-slate-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          {children}
        </div>

        {/* Footer */}
        {showCancel || onConfirm ? (
          <div className="p-8 pt-4 border-t border-slate-100 flex gap-4 justify-end">
            {showCancel && (
              <button
                onClick={onClose}
                className="px-8 py-3 text-slate-600 font-bold border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
              >
                {cancelText}
              </button>
            )}
            {onConfirm && (
              <button
                onClick={onConfirm}
                className="px-8 py-3 bg-[#1e3a8a] hover:bg-blue-800 text-white font-black rounded-2xl transition-all shadow-lg shadow-blue-200"
              >
                {confirmText}
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;

