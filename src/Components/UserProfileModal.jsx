import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import moment from 'moment';

import './UserProfileModal.css';
import { UserController } from '../Controllers/User';
import { API } from "aws-amplify";

export default function UserProfileModal({user, showProfile, handleProfileClose}) {

  const [userProfile, setUserProfile] = useState({});
  const userContoller = UserController(API);

  useEffect(() => {
    if(user) {
      console.debug(`Getting Registered UserId: ${user.username}`);
      userContoller.getRegisteredUser(user.username, API).then((registeredUser) => {
        setUserProfile(registeredUser);
      });
    }
    return () => {};
    // https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
    // I fail to see how userController is reactive and question the linter here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Modal show={showProfile} 
      onHide={handleProfileClose} 
      data-bs-theme="dark"  
      size="lg"
      centered>
      <Modal.Header closeButton>
        <Modal.Title>Profile: <span className="UserProfileModal-title">{user?.attributes['email']}</span></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col><label>UserId:</label></Col>
            <Col><span className="UserProfileModal-value-bold">{ userProfile.userId }</span></Col>
          </Row>
          <Row>
            <Col><label>Email:</label></Col>
            <Col><span className="UserProfileModal-value">{ userProfile.email }</span></Col>
          </Row>
          <Row>
            <Col><label>Provider:</label></Col>
            <Col><span className="UserProfileModal-value">{ userProfile.providerType }</span></Col>
          </Row>
          <Row>
            <Col><label>Provider Id:</label></Col>
            <Col><span className="UserProfileModal-value">{ userProfile.providerId }</span></Col>
          </Row>
          <Row>
            <Col><label>Last Workspace Client IP:</label></Col>
            <Col><span className="UserProfileModal-value-bold">{ userProfile.lastWorkspaceIp }</span></Col>
          </Row>
          <Row>
            <Col><label>Last Workspace Date:</label></Col>
            <Col><span className="UserProfileModal-value">{ moment(new Date(userProfile.lastWorkspaceDate)).calendar() }</span></Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleProfileClose}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>          
  );
}