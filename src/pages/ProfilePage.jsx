
import { useContext, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { AuthContext } from "../feature/AuthContext";
import { useNavigate } from "react-router-dom";

import ProfileSideBar from '../components/ProfileSideBar'
import ProfileMidBody from '../components/ProfileMidBody'


export default function ProfilePage() {

    const authToken = useContext(AuthContext).authToken;
    const setAuthToken = useContext(AuthContext).setAuthToken;

    const navigate = useNavigate("/login");

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        }
    }, [authToken, navigate]);

    function handleLogout() {
        setAuthToken(null)
    }

    return (
        <>
            <Container>
                <Row>
                    <ProfileSideBar handleLogout={handleLogout} />
                    <ProfileMidBody />
                </Row>
            </Container>
        </>
    )
}
