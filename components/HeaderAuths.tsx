import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import { useDispatch } from "react-redux";
import useModal from "../hooks/useModal";
import { authActions } from "../store/auth";
import AuthModal from "./auth/AuthModal";

const Container = styled.div`
  /* 헤더 로그인 회원가입 버튼 */
  .header-auth-buttons {
    button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: #fff;
      cursor: pointer;
      outline: none;
      &.header-sign-up-button {
        margin-right: 8px;
        &:hover {
          background-color: ${palette.gray_f7};
        }
      }
      &.header-login-button {
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
        &:hover {
          box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
        }
      }
    }
  }
`;

const HeaderAuths: React.FC = () => {
  const { openModal, ModalPortal, closeModal } = useModal();

  const dispatch = useDispatch();

  return (
    <Container>
      <div className="header-auth-buttons">
        <button
          className="header-sign-up-button"
          onClick={() => {
            dispatch(authActions.setAuthMode("signup"));
            openModal();
          }}
          type="button"
        >
          회원가입
        </button>
        <button
          className="header-login-button"
          onClick={() => {
            dispatch(authActions.setAuthMode("login"));
            openModal();
          }}
          type="button"
        >
          로그인
        </button>
      </div>
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default HeaderAuths;
