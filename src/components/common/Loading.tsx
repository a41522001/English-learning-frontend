import type { LoadingProps } from '@/types/loading';
import ReactDOM from 'react-dom';
const Loading = ({ isOpen }: LoadingProps) => {
  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="loading_wrap">
      <div className="loading_content"></div>
    </div>,
    document.body
  );
};
export default Loading;
