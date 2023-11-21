import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API } from "aws-amplify";

import './Header.css';

import UserProfileModal from './UserProfileModal';
import { UserController } from '../Controllers/User';

export default function Header({ user, route, signoutCallback }) {
  
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const handleProfileClose = () => setShowProfile(false);

  const userController = UserController(API);

  useEffect(() => {
    if(user) {
      console.debug("Active User:");
      console.debug(user);  
      userController.registerUser(user);
    }
    return () => {    };

    // https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
    // I fail to see how userController is reactive and question the linter here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  let loginButtonText = "Sign In";
  let loginButtonClickHandler = () => {
    if(route === 'authenticated') {
      signoutCallback();
    } else {
      navigate('workspace', { replace: true });
    }
  };

  let profileButtonClickHandler = () => {
    if(route === 'authenticated') {
      setShowProfile(true);
    } 
  };

  return (
    <div className="Header">
    <Navbar data-bs-theme="dark" expand="md" className="Header-custom-nav">
    <Container fluid>
      <Navbar.Brand className="Header-title" href="/">
        Amp<span className="Header-stack">Stack</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="Header-link">
          <Link to={`about`}>About</Link> 
        </Nav>
        { (route === 'authenticated') ?
          (
            <Nav className="Header-link">
              <Link to={`workspace`}>Workspace</Link> 
            </Nav>
          ) : (<></>)
        }
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
      { (route === 'authenticated' && user && user.attributes) ?
        (
          <>
            <NavDropdown title={<span><span className="Header-provider-tag">{userController.getProviderTag(user) + ':'}</span> {user.attributes['email']}</span>} 
            align="end"
            className="Header-user-greeting">
              <NavDropdown.Item onClick={() => profileButtonClickHandler()}>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => loginButtonClickHandler()}>
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          
            <UserProfileModal user={user} showProfile={showProfile} handleProfileClose={handleProfileClose}/>
          </>
        ) : 
        (
          <>
          <Navbar.Text className="Header-user-greeting">
            <span className="Header-welcome">Welcome</span>
          </Navbar.Text>
          <Navbar.Text>
              <Button className="Header-button" size="sm" onClick={() => loginButtonClickHandler()}>{ loginButtonText }</Button>
          </Navbar.Text>
          </>
        )
      }
      </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
  );
}