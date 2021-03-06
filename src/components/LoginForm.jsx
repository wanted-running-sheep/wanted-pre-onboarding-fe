import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Instagram from '../assets/images/InstagramLogo.svg';
import { useAuthState } from '../context/AuthContext';
import { validationCheck } from '../util/validation';
import LoginInput from './LoginInput';

const user = {
  email: 'test@test.com',
  password: 'Test1234!',
};
const ERROR_CHECK_ACCOUNT = '회원정보와 일치하지 않습니다.';

const LoginForm = () => {
  const { login } = useAuthState();
  const [validationState, setValidateState] = useState({
    email: null,
    password: null,
  });

  const emailRef = useRef();
  const pwRef = useRef();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (validationState[name] === validationCheck(name, value)) return;
    setValidateState((prev) => ({
      ...prev,
      [name]: validationCheck(name, value),
    }));
  };
  const checkVerify = () => {
    return (
      emailRef.current.value === user.email &&
      pwRef.current.value === user.password
    );
  };
  const isCheckValidation = () => {
    return validationState.email && validationState.password;
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (!checkVerify()) alert(ERROR_CHECK_ACCOUNT);
    login();
  };

  return (
    <Container>
      <img src={Instagram} alt="인스타그램 로고" />
      <form onSubmit={onSubmit}>
        <LoginInput
          name="email"
          type="email"
          placeholder="이메일"
          inputRef={emailRef}
          handleInput={handleInput}
          isValidation={validationState.email}
        />
        <LoginInput
          name="password"
          type="password"
          placeholder="비밀번호"
          inputRef={pwRef}
          handleInput={handleInput}
          isValidation={validationState.password}
        />
        <LoginButton
          type="submit"
          disabled={!isCheckValidation()}
          background={isCheckValidation()}
        >
          로그인
        </LoginButton>
      </form>
    </Container>
  );
};

export default LoginForm;

const Container = styled.div`
  width: 350px;
  height: 400px;
  background: white;
  border: 1px solid lightgray;
  text-align: center;
  padding: 25px 30px;

  img {
    width: 65%;
    padding: 25px 0px;
  }
`;
const LoginButton = styled.button`
  width: 100%;
  color: white;
  font-weight: 600;
  margin: 10px 0px;
  padding: 7px 0px;
  border-radius: 5px;
  cursor: pointer;
  background: ${({ background, theme }) =>
    background ? theme.color.button.primary : theme.color.button.disabled};
`;
