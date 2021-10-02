import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UsersView from './pages/Admin/AdminUsers';
import axios from 'axios';
import './App.css';

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header className="App-header"/>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/authorized' component={Dashboard} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />

          {/* TESTING  */}
          <Route path='/users' component={UsersView} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
