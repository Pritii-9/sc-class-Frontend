import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning';
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', duration = 4000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) setTimeout(onClose, 300); // Delay for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 border-green-400 shadow-green-200 text-white';
      case 'error':
        return 'bg-red-500 border-red-400 shadow-red-200 text-white';
      case 'warning':
        return 'bg-yellow-500 border-yellow-400 shadow-yellow-200 text-slate-900';
      default:
        return 'bg-blue-500 border-blue-400 shadow-blue-200 text-white';
    }
  };

  const Icon = () => {
    switch (type) {
      case 'success': return <CheckCircle2 size={20} />;
      case 'error': return <XCircle size={20} />;
      case 'warning': return <AlertTriangle size={20} />;
      default: return null;
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed top-24 right-6 z-[1000] animate-slideInRight">
      <div className={`border-2 ${getColors()} rounded-[2rem] p-6 shadow-2xl min-w-[350px] flex items-start gap-4 transform transition-all hover:scale-[1.02]`}>
        <div className="flex-shrink-0 mt-0.5">
          <Icon />
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm leading-tight">{message}</p>
        </div>
<button
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
          className="ml-2 p-1 hover:bg-white/20 rounded-lg transition-all flex-shrink-0"
          aria-label="Dismiss toast"
        >
          <XCircle size={16} />
        </button>
      </div>
    </div>
  );
};

// Container component to manage multiple toasts
interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type: ToastProps['type'] }>;
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => (
  <>
    {toasts.map((toast) => (
      <Toast
        key={toast.id}
        message={toast.message}
        type={toast.type}
        onClose={() => onRemove(toast.id)}
      />
    ))}
  </>
);

export default Toast;

