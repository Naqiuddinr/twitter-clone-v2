
import { useContext, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { savePost } from "../feature/posts/postsSlice";
import { AuthContext } from "../feature/AuthContext"


export default function NewPostModal({ handleClose, show }) {

    const [postContent, setPostContent] = useState("");
    const dispatch = useDispatch();

    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;

    function handleSave() {

        dispatch(savePost({ userId, postContent }));
        handleClose();
        setPostContent("");
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
