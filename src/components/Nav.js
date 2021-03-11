import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Nav() {
    const [auth, setAuth] = useContext(AuthContext);

    const history = useHistory();

    function logout() {
        setAuth(null);
        history.push('/');
    }

    return (
        <nav className="nav">
            {auth ? (
                <div className="nav__flex">
                    <div>
                        <Link className="nav__link" to='/'>Home</Link>
                        <Link className="nav__link" to='/products'>Products</Link>
                        <Link className="nav__link" to='/add'>Add product</Link>
                    </div>
                    <button className="nav__logout" onClick={logout}>Log out</button>
                </div>
            ) : (
                    <div>
                        <Link className="nav__link" to='/'>Home</Link>
                        <Link className="nav__logout"  to='/login'>Login</Link>
                    </div>
                )}
        </nav>
    );
}

export default Nav;