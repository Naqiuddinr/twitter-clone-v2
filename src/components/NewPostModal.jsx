
import { useContext, useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { savePost } from "../feature/posts/postsSlice";
import { AuthContext } from "../feature/AuthContext"


export default function NewPostModal({ handleClose, show }) {

    const [postContent, setPostContent] = useState("");
    const [file, setFile] = useState(null)
    const dispatch = useDispatch();

    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;


    useEffect(() => {
        console.log(postContent)
    }, [postContent, show])

    function handleSave() {

        dispatch(savePost({ userId, postContent, file }));
        console.log(userId)
        handleClose();
        setPostContent("");
        setFile(null);
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                            />
                            <br />
                            <Form.Control type="file" onChange={handleFileChange} />
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
