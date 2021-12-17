import React from 'react'
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.div`
    width: 100%;
    height: 46px;
    select {
        width: 100%;
        height: 100%;
        background-color: ${palette.gray_eb};
        padding: 0 11px;
        border-radius:4px;
        outline:none;
        -webkit-appearance: none;
        background: url('/static/svg/common/selector/selector_down_arrow.svg') no-repeat right 11px center;
        font-size: 16px;
    }
`

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options?: string[];
    disabledOptions?: string[];
    value?: string;
}


const Selector: React.FC<IProps> = ({ options = [], disabledOptions = [], ...props }) => {
    return (
        <Container>
            <select {...props}>
                {disabledOptions.map((option, idx) => (
                    <option key={idx} value={option} disabled >
                        {option}
                    </option>
                ))}
                {options.map((option, idx) => (
                    <option key={idx} value={option} >
                        {option}
                    </option>
                ))}
            </select>
        </Container >
    )
}

export default Selector
