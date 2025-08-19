import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
type Direction = 'top' | 'bottom' | 'left' | 'right';
interface Props {
  children: React.ReactNode;
  model: boolean;
  onClose: () => void;
  direction?: Direction;
  isScroll?: boolean;
  persistent?: boolean;
  title?: string;
}
const SCROLL_LOCK_CLASS = 'drawer-scroll-lock';
const Drawer = ({ model, onClose, children, direction = 'right', isScroll = false, persistent = false, title = '' }: Props) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const lockScroll = () => {
    const html = document.documentElement;
    const body = document.body;
    const count = Number(body.dataset.lockCount || 0) + 1;
    body.dataset.lockCount = String(count);
    if (count === 1) {
      const scrollBarW = window.innerWidth - html.clientWidth;
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
      if (scrollBarW > 0) body.style.paddingRight = `${scrollBarW}px`;
      body.classList.add(SCROLL_LOCK_CLASS);
    }
  };

  const unlockScroll = () => {
    const html = document.documentElement;
    const body = document.body;
    const count = Math.max(0, Number(body.dataset.lockCount || 0) - 1);
    body.dataset.lockCount = String(count);
    if (count === 0) {
      body.style.overflow = '';
      html.style.overflow = '';
      body.style.paddingRight = '';
      body.classList.remove(SCROLL_LOCK_CLASS);
    }
  };

  // 方向與寬高
  const directionAndSizeClass = (direction: Direction): string => {
    switch (direction) {
      case 'right':
        return 'top-0 right-0 min-h-screen h-full';
      case 'left':
        return 'top-0 left-0 min-h-screen h-full';
      case 'top':
        return 'top-0 left-0 w-full h-auto';
      case 'bottom':
        return 'bottom-0 left-0 w-full h-auto';
      default:
        return 'top-0 right-0 min-h-screen h-full';
    }
  };

  // 動畫位置
  const animationClass = (direction: Direction): string => {
    switch (direction) {
      case 'right':
        return 'translate-x-full';
      case 'left':
        return '-translate-x-full';
      case 'top':
        return '-translate-y-full';
      case 'bottom':
        return 'translate-y-full';
      default:
        return 'translate-x-full';
    }
  };

  // 控制渲染及動畫
  useEffect(() => {
    if (model) {
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
  }, [model]);

  // 控制滾動
  useEffect(() => {
    if (model && !isScroll) lockScroll();
    return () => {
      if (!isScroll) unlockScroll();
    };
  }, [model, isScroll]);

  // 滑鼠控制開關
  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (!drawerRef.current?.contains(e.target as Node) && !persistent) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClose);
    return () => {
      document.removeEventListener('mousedown', handleClose);
    };
  }, [onClose, persistent]);

  // 鍵盤控制開關
  useEffect(() => {
    const handleClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !persistent) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('keydown', handleClose);
    };
  }, [onClose, persistent]);

  if (!isMounted) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="drawer">
      <div className={clsx('drawer_wrap', directionAndSizeClass(direction), isAnimating ? '' : animationClass(direction))} ref={drawerRef}>
        <div className="drawer_header">
          <div className="drawer_title">{title}</div>
          <span className="dialog_close_btn" onClick={() => onClose?.()}>
            &times;
          </span>
        </div>
        <div className="drawer_content">{children}</div>
      </div>
    </div>,
    document.body
  );
};
export default Drawer;
