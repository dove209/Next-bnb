import React from 'react'
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';
import { useSelector } from '../../store';

type InputContainerProps = {
    iconExist: boolean;     //아이콘 유무
    isValid: boolean;       //값이 유요한지
    useValidation: boolean; //밸리데이션 사용 유무
}

const Container = styled.div<InputContainerProps>`
    input {
        position: relative;
        width: 100%;
        height: 46px;
        padding: ${({ iconExist }) => (iconExist ? '0 44px 0 11px' : '0 11px')}; //${(props) => (props.iconExist ? '0 44px 0 11px' : '0 11px')}
        border: 1px solid ${palette.gray_eb};
        border-radius: 4px;
        font-size: 16px;
        outline: none;
        ::placeholder {
            color: ${palette.gray_76};
        }
        &:focus {
            border-color: ${palette.dark_cyan} !important;
        }
    }
    svg {
        position: absolute;
        right: 11px;
        top:50%;
        transform: translateY(-50%);
    }
    .input-error-message {
        margin-top: 8px;
        font-weight: 600;
        font-size: 14px;
        color: ${palette.tawny};
    }
    ${({ useValidation, isValid }) =>
        useValidation &&
        !isValid &&
        css`
            input {
                background-color: ${palette.snow};
                border-color: ${palette.orange};
                &:focus {
                    border-color: ${palette.orange};
                }
            }
        `}
    
    ${({ useValidation, isValid }) =>
        useValidation && isValid &&
        css`
            input {
                border-color: ${palette.dark_cyan}
            }
        `} 
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: JSX.Element; //icon: JSX.Element | undefined; 같은거
    isValid?: boolean;
    validataMode?: boolean;
    useValidation?: boolean;
    errorMessage?: string;
}

const Input: React.FC<IProps> = ({ icon, isValid = false, useValidation = true, errorMessage, ...props }) => {
    const validataMode = useSelector((state) => state.common.validateMode)
    return (
        <Container
            iconExist={!!icon}
            isValid={isValid}
            useValidation={validataMode && useValidation}
        >
            <input {...props} />
            {icon}
            {useValidation && validataMode && !isValid && errorMessage && (
                <p className='input-error-message'>{errorMessage}</p>
            )}
        </Container>
    );
};

export default Input
