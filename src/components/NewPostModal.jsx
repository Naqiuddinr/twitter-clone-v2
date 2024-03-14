import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap";


export default function NewPostModal({ handleClose, show }) {

    const [postContent, setPostContent] = useState("");

    function handleSave() {

        const token = localStorage.getItem('authToken');

        const decode = jwtDecode(token);
        const userId = decode.id;

        const data = {
            title: "Post Title",
            content: postContent,
            user_id: userId
        };

        axios
            .post('https://85e26881-9d33-47ea-98c8-e946f60ddfca-00-1ciplofky6m83.spock.replit.dev/posts', data)
            .then((response) => {
                console.log("Success:", response.data);
                handleClose();
            })
            .catch((error) => {
                console.error("Error", error);
            })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId='postContent'>
                            <Form.Control
                                placeholder="What is happening?"
                                as="textarea"
                                rows={4}
                                onChange={(e) => setPostContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="dark"
                        className="rounded-pill"
                        onClick={handleSave}
                    >
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
