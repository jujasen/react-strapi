import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import Products from './pages/Products'
import Nav from './components/Nav';
import EditProduct from './pages/EditProduct';
import AddProduct from './pages/AddProduct';
import './sass/main.scss'


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/login' exact component={Login} />
          <Route path='/products' exact component={Products} />
          <Route path='/edit/:id' exact component={EditProduct} />
          <Route path='/add' exact component={AddProduct} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;