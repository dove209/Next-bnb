import React from "react";
import Link from "next/link";
import Button from "../../common/Button";
import { makeQueryString } from "../../../lib/utils";
import { useSelector } from "../../../store";

const SearchRoomButton = () => {
  const searchRoom = useSelector((state) => state.searchRoom);

  const roomListHref = makeQueryString("/room", searchRoom);

  return (
    <Link href={roomListHref}>
      <a>
        <Button color="amaranth" width="89px">
          검색
        </Button>
      </a>
    </Link>
  );
};

export default SearchRoomButton;
