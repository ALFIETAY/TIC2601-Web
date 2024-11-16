import './Cover.css';
import { Link } from 'react-router-dom';

function Cover() {
  return (
    <div id='container-cover'>
      <header>
        <h1 id='header-cover'>Fitness App</h1>
      </header>
      <div id="link-cover">
        <Link to='/signup'>
          <button tabIndex={1} id='signup-cover'>Sign Up</button>
        </Link>
      </div>
      <div id="link-cover">
        <Link to='/login'>
          <button tabIndex={2} id='login-cover'>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Cover;
