interface Props {
  onClick: () => void;
}
const LogoutBtn = ({ onClick }: Props) => {
  return (
    <button className="logout_btn" onClick={onClick}>
      <span className="material-symbols-outlined !text-lg">logout</span>
      登出
    </button>
  );
};
export default LogoutBtn;
