import { Link } from "react-router-dom";

export default function SelectRoomMode() {

    return (
        <>
            <navbar>
                <Link to={"room"}>Занятые комнаты</Link>
                <Link to={"acceptRoom"}>Одобрить комнаты</Link>
            </navbar>
        </>
    );
}