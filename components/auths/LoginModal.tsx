import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "../../public/static/svg/modal/modal_close_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import palette from "../../styles/palette";
import Button from "../common/Button";
import Input from "../common/Input";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

import { loginAPI } from "../../lib/api/auth";

// 로그인 밸리데이션
import useValidataMode from "../../hooks/useValidataMode";
import { userActions } from "../../store/user";

const Container = styled.div`
  width: 568px;
  padding: 32px;
  background-color: #fff;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .login-input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .login-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .login-modal-set-signup {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface IProps {
  closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isPasswordHided, setIsPasswordHided] = useState(true);

  const { setVaildateMode } = useValidataMode();

  useEffect(() => {
    return () => {
      setVaildateMode(false);
    };
  }, []);

  // 이메일 주소 변경
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // 비밀번호 변경 시
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // 비밀번호 숨김 토글
  const toggleHidePassword = () => {
    setIsPasswordHided(!isPasswordHided);
  };

  // 회원가입 모달로 변경
  const changeToSignUpModal = () => {
    dispatch(authActions.setAuthMode("signup"));
  };

  // 로그인 클릭 시
  const onSubmitLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setVaildateMode(true);

    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
    } else {
      const loginBody = { email, password };

      try {
        const { data } = await loginAPI(loginBody);
        dispatch(userActions.setLoggedUser(data));
        closeModal();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Container>
      <CloseIcon className="modal-close-x-icon" onClick={closeModal} />
      <div className="login-input-wrapper">
        <Input
          placeholder="이메일 주소"
          name="email"
          type="email"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
          isValid={!!email}
          errorMessage="이메일이 필요합니다."
        />
      </div>
      <div className="login-input-wrapper login-password-input-wrapper">
        <Input
          placeholder="비밀번호 설정하기"
          type={isPasswordHided ? "password" : "text"}
          icon={
            isPasswordHided ? (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
          isValid={!!password}
          errorMessage="비밀번호를 입력하세요."
        />
      </div>

      <div className="login-modal-submit-button-wrapper">
        <Button type="submit" onClick={onSubmitLogin}>
          로그인
        </Button>
      </div>

      <p>
        에어비앤비 계정이 없나요?
        <span
          className="login-modal-set-signup"
          role="presentation"
          onClick={changeToSignUpModal}
        >
          회원가입
        </span>
      </p>
    </Container>
  );
};

export default LoginModal;
