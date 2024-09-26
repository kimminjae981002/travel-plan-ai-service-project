// src/components/Signup.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CenteredModal } from '../Styles/Common/Common.style';

const Signup = ({ show, handleClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');

  const handleSignup = async () => {
    const userData = {
      username: username.trim(),
      password: password.trim(),
      passwordCheck: passwordCheck.trim(),
      name: name.trim(),
    };

    try {
      const response = await fetch('http://52.78.138.193:3000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('회원가입 성공!');
        handleClose();
      } else {
        const errorText = await response.text();
        const errorResponse = JSON.parse(errorText);
        const messages = errorResponse.message;
        console.error('Error response:', messages);
        alert('회원가입 실패: ' + messages);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  //회원가입 모달 창
  return (
    <CenteredModal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>회원가입</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>아이디</Form.Label>
            <Form.Control
              type="text"
              placeholder="아이디 입력"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호 재입력"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Label>닉네임</Form.Label>
            <Form.Control
              type="text"
              placeholder="닉네임 입력"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleSignup}>
          회원가입
        </Button>
      </Modal.Footer>
    </CenteredModal>
  );
};

export default Signup;
