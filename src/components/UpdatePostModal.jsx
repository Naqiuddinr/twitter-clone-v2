
import { useContext, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { updatePost } from "../feature/posts/postsSlice";
import { AuthContext } from "../feature/AuthContext"


export default function UpdatePostModal({ show, handleClose, postId, originalPostContent }) {

    const [newPostContent, setNewPostContent] = useState(originalPostContent);
    const [newFile, setNewFile] = useState(null)
    const dispatch = useDispatch();

    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;

    function handleUpdate() {

        dispatch(updatePost({ userId, postId, newPostContent, newFile }));
        handleClose();
        setNewPostContent(newPostContent);
        setNewFile(null);
    }

    const handleNewFileChange = (e) => {
        setNewFile(e.target.files[0]);
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
                                defaultValue={originalPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                            />
                            <br />
                            <Form.Control type="file" onChange={handleNewFileChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="dark"
                        className="rounded-pill"
                        onClick={handleUpdate}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}