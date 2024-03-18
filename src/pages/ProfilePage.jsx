
import { useContext, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { AuthContext } from "../feature/AuthContext";
import { useNavigate } from "react-router-dom";

import { getAuth } from 'firebase/auth'

import ProfileSideBar from '../components/ProfileSideBar'
import ProfileMidBody from '../components/ProfileMidBody'


export default function ProfilePage() {

    // const authToken = useContext(AuthContext).authToken;
    // const setAuthToken = useContext(AuthContext).setAuthToken;

    const navigate = useNavigate();
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    function handleLogout() {
        auth.signOut()
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
