import React, { useState } from 'react'
import styled from 'styled-components';
import palette from '../../../styles/palette';
import NavigationIcon from '../../../public/static/svg/register/navigation.svg';
import Button from '../../common/Button';
import Selector from '../../common/Selector';
import Input from '../../common/Input';
import RegisterRoomFooter from './RegisterRoomFooter';
import { countryList } from '../../../lib/staticData';
import { useDispatch } from 'react-redux';
import { registerRoomActions } from '../../../store/registerRoom';
import { useSelector } from '../../../store';

import { getLocationIofoAPI } from '../../../lib/api/map';

const Container = styled.div`
    padding: 62px 30px 100px;
    h2 {
        font-size: 19px;
        font-weight: 800px;
        margin-bottom: 56px;
    }
    h3 {
        font-weight: bold;
        color: ${palette.gray_76};
        margin-bottom: 6px;
    }
    .register-room-step-info {
        font-size: 14px;
        max-width: 400px;
        margin-bottom: 24px;
    }
    .register-room-location-button-wrapper {
        width: 176px;
        margin-bottom: 24px;
    }
    .register-room-location-country-selector-wrapper {
        width: 385px;
        margin-bottom: 24px;
    }
    .register-room-location-city-district {
        width: 385px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
        & > div {
            width: 180px;
        }
    }
    .register-room-location-street-address {
        width: 385px;
        margin-bottom: 24px;
    }
    .register-room-location-detail-address {
        width: 385px;
        margin-bottom: 24px;
    }
    .register-room-location-postcode {
        width: 385px;
        margin-bottom: 24px;
    }
`;

const RegisterRoomLocation: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const country = useSelector((state) => state.registerRoom.country);
    const city = useSelector((state) => state.registerRoom.city);
    const district = useSelector((state) => state.registerRoom.district);
    const streetAddress = useSelector((state) => state.registerRoom.streetAddress);
    const detailAddress = useSelector((state) => state.registerRoom.detailAddress);
    const postcode = useSelector((state) => state.registerRoom.postcode);

    const dispatch = useDispatch();

    // ?????? ?????? ???
    const onChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(registerRoomActions.setCountry(event.target.value));
    }
    // ???/??? ?????? ???
    const onChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(registerRoomActions.setCity(event.target.value));
    }
    // ???/???/??? ?????? ???
    const onChangeDistrict = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(registerRoomActions.setDistrict(event.target.value));
    }
    // ??????????????? ?????? ???
    const onChangeStreetAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(registerRoomActions.setStreetAddress(event.target.value));
    }
    // ????????? ?????? ???
    const onChangeDetailAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(registerRoomActions.setDetailAddress(event.target.value));
    }
    // ???????????? ?????????
    const onChangePostcode = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(registerRoomActions.setPostcode(event.target.value));
    }

    // ?????? ?????? ???????????? ???????????? ???
    type Coordinates = { latitude: number, longitude: number };
    const onSuccessGetLocation = async (coords: Coordinates) => {
        try {
            const { data: currentLocation } = await getLocationIofoAPI({ latitude: coords.latitude, longitude: coords.longitude });
            dispatch(registerRoomActions.setCountry(currentLocation.country))
            dispatch(registerRoomActions.setCity(currentLocation.city))
            dispatch(registerRoomActions.setDistrict(currentLocation.district))
            dispatch(registerRoomActions.setStreetAddress(currentLocation.streetAddress))
            dispatch(registerRoomActions.setPostcode(currentLocation.postcode))
            dispatch(registerRoomActions.setLatitude(currentLocation.latitude))
            dispatch(registerRoomActions.setLongitude(currentLocation.longitude))
        } catch (e) {
            console.log(e)
        }
        setLoading(false);
    }


    // ?????? ?????? ?????? ?????? ???
    const onClickGetCurrentLocation = () => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(({ coords }) => onSuccessGetLocation(coords), (e) => {
            console.log(e);
            alert(e?.message)
        })
    }

    return (
        <Container>
            <h2>????????? ????????? ???????????????.</h2>
            <h3>4??????</h3>
            <p className='register-room-step-info'>
                ????????? ?????? ????????? ???????????? ????????? ????????? ????????? ???????????????.
            </p>
            <div className='register-room-location-button-wrapper'>
                <Button
                    color='dark_cyan'
                    colorReverse
                    icon={<NavigationIcon />}
                    onClick={onClickGetCurrentLocation}
                >
                    {loading ? "???????????? ???....." : "?????? ?????? ??????"}
                </Button>
            </div>
            <div className='register-room-location-country-selector-wrapper'>
                <Selector
                    type='register'
                    options={countryList}
                    useValidation={false}
                    disabledOptions={['??????/?????? ??????']}
                    value={country}
                    onChange={onChangeCountry}
                />
            </div>
            <div className='register-room-location-city-district'>
                <Input label='???/???' value={city} onChange={onChangeCity} />
                <Input label='???/???/???' value={district} onChange={onChangeDistrict} />
            </div>
            <div className='register-room-location-street-address'>
                <Input label='???????????????' value={streetAddress} onChange={onChangeStreetAddress} />
            </div>
            <div className='register-room-location-detail-address'>
                <Input label='?????????(?????? ??????)' value={detailAddress} onChange={onChangeDetailAddress} useValidation={false} />
            </div>
            <div className='register-room-location-postcode'>
                <Input label='????????????' value={postcode} onChange={onChangePostcode} />
            </div>

            <RegisterRoomFooter
                prevHref='/room/register/bathroom'
                nextHref='/room/register/geometry'
            />
        </Container>
    )
}

export default RegisterRoomLocation;
