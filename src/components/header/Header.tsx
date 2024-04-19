import "./Header.css";

const Header = () => {
  return (
    <div className="header_container">
      <h1>
        React <span style={{ color: "red" }}>Menu Extraction</span> &
        <span style={{ color: "#6161cf" }}> Visualization</span>
      </h1>
      <h4 className="mine">@Samuel_T</h4>
    </div>
  );
};
export default Header;
