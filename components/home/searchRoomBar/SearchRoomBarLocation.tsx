import React from 'react'
import styled from 'styled-components';
import palette from '../../../styles/palette';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../store';
import { searchRoomActions } from '../../../store/searchRoom';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 70px;
    border: 2px solid transparent;
    border-radius: 12px;
    cursor: pointer;
    &:hover {
        border-color: ${palette.gray_dd};
    }

    .search-room-bar-location-texts {
        position: absolute;
        width: calc(100% - 40px);
        top: 16px;
        left: 20px;
        .search-room-bar-location-label {
            font-size: 10px;
            font-weight: 800;
            margin-bottom: 4px;
        }
        input {
            width: 100%;
            border: 0;
            font-size: 14px;
            font-weight: 600;
            outline: none;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &::placeholder {
                font-size: 14px;
                opacity: 0.7;
            }
        }
    }
    .search-room-bar-location-results {
        position: absolute;
        background-color: #fff;
        top: 78px;
        width: 500px;
        padding: 16px;

    }
`;

const SearchRoomBarLocation: React.FC = () => {
    return (
        <Container>
            위치
        </Container>
    )
}

export default SearchRoomBarLocation
