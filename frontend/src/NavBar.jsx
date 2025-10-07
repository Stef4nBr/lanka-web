import './navBar.css';
import AuthModal from './AuthModal';


function NavBar() {


  return (
    <div className="NavBar">
      <div className="leftSide">
        <h1>www.lan.ka/</h1>
      </div>
      <div className="rightSide">
        <button className="HTP">How to play</button>
        <AuthModal variant="primary">        </AuthModal>

      </div>
    </div>
  );
}

export default NavBar;
