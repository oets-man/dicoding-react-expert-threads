import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from './Button';

const Navigation = ({ auth, onLogout }) => {
  return (
    <nav className="">
      <ul className="flex items-center gap-x-2">
        <li>
          <Button.Normal as={Link} to="/threads" iconName="entypo:chat">
            Threads
          </Button.Normal>
        </li>
        <li>
          <Button.Normal as={Link} to="/leaderboards" iconName="material-symbols-light:leaderboard">
            Leaderboards
          </Button.Normal>
        </li>
        <li>
          <Button.Normal onClick={() => window.history.back()} iconName="material-symbols-light:arrow-back">
            Kembali
          </Button.Normal>
        </li>
        <li>
          {auth ? (
            <Button.Danger onClick={onLogout} iconName="material-symbols:logout">
              Keluar
            </Button.Danger>
          ) : (
            <Button.Normal as={Link} to="/login" iconName="material-symbols:login">
              Login
            </Button.Normal>
          )}
        </li>
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  auth: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navigation;
