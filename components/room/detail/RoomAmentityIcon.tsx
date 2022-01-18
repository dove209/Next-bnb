import React from 'react';
import TvIcon from '../../../public/static/svg/room/detail/tv.svg';
import WifiIcon from '../../../public/static/svg/room/detail/tv.svg';
import ThermometerIcon from '../../../public/static/svg/room/detail/tv.svg';
import IceIcon from '../../../public/static/svg/room/detail/tv.svg';
import IronIcon from '../../../public/static/svg/room/detail/tv.svg';
import ShampooIcon from '../../../public/static/svg/room/detail/tv.svg';
import HairDryerIcon from '../../../public/static/svg/room/detail/tv.svg';
import CoffeeIcon from '../../../public/static/svg/room/detail/tv.svg';
import NotebookIcon from '../../../public/static/svg/room/detail/tv.svg';
import FireplaceIcon from '../../../public/static/svg/room/detail/tv.svg';
import ClosetIcon from '../../../public/static/svg/room/detail/tv.svg';
import DoorIcon from '../../../public/static/svg/room/detail/tv.svg';

interface IProps {
    amentity: string
}

const RoomAmentityIcon: React.FC<IProps> = ({ amentity }) => {
    switch (amentity) {
        case 'TV':
            return <TvIcon />;
        case '무선 인터넷':
            return <WifiIcon />;
        case '난방':
            return <ThermometerIcon />;
        case '에어컨':
            return <IceIcon />
        case '다리미':
            return <IronIcon />
        case '샴푸':
            return <ShampooIcon />
        case '헤어 드라이어':
            return <HairDryerIcon />
        case '조식, 커피, 차':
            return <CoffeeIcon />
        case '업무 가능 공간/책상':
            return <NotebookIcon />
        case '벽난로':
            return <FireplaceIcon />
        case '옷장/서랍장':
            return <ClosetIcon />
        case '게스트 전용 출입문':
            return <DoorIcon />;
        default:
            return <></>;
    };
}

export default RoomAmentityIcon;
