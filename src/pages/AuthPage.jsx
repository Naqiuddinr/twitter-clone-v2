import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";

// import axios from "axios";
import { AuthContext } from "../feature/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
} from "firebase/auth";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AuthPage() {

    const loginImage = 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-black-icon.png'
    // const url = 'https://1e750291-564d-4a33-9063-bcbdde89125d-00-16uxgkua7cz9j.worf.replit.dev'

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // const authToken = useContext(AuthContext).authToken;
    // const setAuthToken = useContext(AuthContext).setAuthToken;

    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("Signup")
    const handleShowLogin = () => setModalShow("Login");
    const handleClose = () => {
        setModalShow(null)
        setErrorMessage("")
    };

    const navigate = useNavigate();
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);

    const provider = new GoogleAuthProvider();

    useEffect(() => {
        if (currentUser) {
            navigate("/profile")
        }
    }, [currentUser, navigate])

    async function handleLogin(e) {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, username, password)
        } catch (err) {
            console.log(err.code)
            setErrorMessage("Wrong email/password, please check and try again")
        }
    }

    async function handleSignup(e) {
        e.preventDefault();

        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                username,
                password
            );
            console.log(response.user)
        } catch (err) {
            if (err.code === 'auth/weak-password') {
                setErrorMessage("Password should be at least 6 characters")
            } else if (err.code === 'auth/email-already-in-use') {
                setErrorMessage("Email already in use")
            }
        }
    }

    async function handleGoogleLogin(e) {
        e.preventDefault();

        try {
            await signInWithPopup(auth, provider)

        } catch (error) {
            console.error(error)
        }

    }

    async function handleResetPassword(e) {
        e.preventDefault();

        try {
            const res = await sendPasswordResetEmail(auth, username)
            console.log(res)
        } catch (err) {
            console.log(err)
        } finally {
            handleClose();
            toast("Please check your email");
        }
    }

    return (
        <div className="auth" style={{ height: '100vh' }}>
            <Row className="mt-5 p-3">
                <Col sm={6} className="d-flex justify-content-center align-items-center" >
                    <Image src={loginImage} fluid style={{ height: '300px' }} />
                </Col>
                <Col sm={6} className="p-5">
                    <h1 className="mt-5" style={{ fontSize: 64, fontWeight: "bold" }}>Happening now</h1>
                    <h1 className="my-5" style={{ fontSize: 31, fontWeight: "bold" }}>Join today</h1>
                    <Col sm={5} className="d-grid gap-2">
                        <Button className="rounded-pill" variant="outline-dark" onClick={handleGoogleLogin}>
                            <i className="bi bi-google"></i>  Sign up with Google
                        </Button>
                        <Button className="rounded-pill" variant="outline-dark">
                            <i className="bi bi-apple"></i>  Sign up with Apple
                        </Button>
                        <p className="my-3" style={{ textAlign: "center" }}>Or</p>
                        <Button className="rounded-pill" variant="secondary" onClick={handleShowSignUp}>
                            Create an account
                        </Button>
                        <p style={{ fontSize: 12 }}>
                            By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
                        </p>

                        <p className="mt-5" style={{ fontWeight: "bold" }}>
                            Already have an account?
                        </p>
                        <Button className="rounded-pill" variant="outline-dark" onClick={handleShowLogin}>
                            Sign in
                        </Button>
                    </Col>
                </Col>

                <Modal show={modalShow !== null} onHide={handleClose} centered>
                    <Modal.Body className="d-grid gap-2 px-5">
                        <div className="d-flex justify-content-center mb-4">
                            <Image src={loginImage} fluid style={{ height: '30px' }} />
                        </div>
                        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                            {modalShow === "Signup" ? "Create your account" : "Sign in to X"}
                        </h2>

                        <Form onSubmit={modalShow === "Signup" ? handleSignup : handleLogin}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Control
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <p style={{ fontSize: 12 }}>
                                By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
                            </p>

                            <Button className="rounded-pill" variant="secondary" type="submit">
                                {modalShow === "Signup" ? "Sign Up" : "Log In"}
                            </Button>
                            <div className="mt-4 text-danger">{errorMessage}</div>
                            {errorMessage === "Wrong email/password, please check and try again" && (
                                <p className="mt-3 text-muted">Reset password? Click <a href="" onClick={handleResetPassword}>here</a></p>
                            )}
                        </Form>
                    </Modal.Body>
                </Modal>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition:Bounce
                />
            </Row>
        </div >
    )
}
