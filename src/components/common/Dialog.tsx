import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import type { DialogProps } from '../../types/dialog';
const Dialog = ({ title = '', message, isOpen, width = '', children, showCloseBtn, onClose }: DialogProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const contentWidth = width ? { width: width } : {};

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      return () => {
        clearTimeout(timer);
      };
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 300);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  if (!isMounted) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={clsx('dialog_wrap', isAnimating ? 'opacity-100' : 'opacity-0')}>
      <div
        className={clsx('dialog_content', {
          'w-80': !width,
        })}
        style={contentWidth}
        role="dialog"
      >
        {showCloseBtn && (
          <span className="dialog_close_btn" onClick={() => onClose?.()}>
            &times;
          </span>
        )}
        {title && <p className="dialog_title">{title}</p>}
        {message && <p className="dialog_message">{message}</p>}
        <div className="dialog_action">{children}</div>
      </div>
    </div>,
    document.body
  );
};
export default Dialog;
