import { Button, Col } from "react-bootstrap";
import { useState } from "react";

import IconButton from "./IconButton";
import NewPostModal from "./NewPostModal";
import ChatBotModal from "./ChatBotModal";


export default function ProfileSideBar({ handleLogout }) {

    const [show, setShow] = useState(false);
    const [showChatBot, setShowChatBot] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseChatBot = () => setShowChatBot(false);
    const hadnleShowChatBot = () => setShowChatBot(true);


    return (
        <Col
            sm={2}
            className="d-flex flex-column justify-content-start align-items-start bg-light vh-100"
            style={{ position: "sticky", top: 0 }}
        >
            <IconButton className="bi bi-twitter-x" isTop />
            <IconButton className="bi bi-house-door" text="Home" />
            <IconButton className="bi bi-search" text="Explore" />
            <IconButton className="bi bi-bell" text="Notifications" />
            <IconButton className="bi bi-journal-text" text="Lists" />
            <IconButton className="bi bi-bookmark" text="Bookmarks" />
            <IconButton className="bi bi-patch-check" text="Verified" />
            <IconButton className="bi bi-person" text="Profile" />
            <IconButton className="bi bi-chat-square-text" text="Grok" onClick={hadnleShowChatBot} />
            <Button className="rounded-pill w-100 mb-3" variant="dark" onClick={handleShow}>
                Post
            </Button>

            <NewPostModal show={show} handleClose={handleClose} />
            <ChatBotModal show={showChatBot} handleClose={handleCloseChatBot} />

            <Button
                className="light rounded-pill mt-auto mb-4 w-100"
                variant="outline-danger"
                onClick={handleLogout}
            >Logout</Button>
        </Col>
    )
}
