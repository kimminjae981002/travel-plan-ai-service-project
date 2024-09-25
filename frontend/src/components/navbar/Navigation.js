import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';
import Signup from './signup';
import Login from './login';

const Navigation = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
      setIsLoggedIn(true);
    }
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleLoginSuccess = (tokens) => {
    setAccessToken(tokens.accessToken); // access token 저장
    localStorage.setItem('accessToken', tokens.accessToken);
    setIsLoggedIn(true);
    handleCloseLogin(); // 모달 닫기
  };

  const handleLogout = () => {
    alert('로그아웃 완료');
    setAccessToken('');
    setIsLoggedIn(false);

    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'; // 쿠키 삭제

    // 로컬 스토리지에서 access token 삭제
    localStorage.removeItem('accessToken');
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">MJBlog</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {isLoggedIn ? (
                <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
              ) : (
                <>
                  <Nav.Link onClick={handleShow}>회원가입</Nav.Link>
                  <Nav.Link onClick={handleShowLogin}>로그인</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Signup show={showModal} handleClose={handleClose} />
      <Login
        show={showLogin}
        handleClose={handleCloseLogin}
        onLoginSuccess={handleLoginSuccess}
        accessToken={accessToken}
      />
    </>
  );
};

export default Navigation;
