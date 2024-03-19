
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AuthContext } from "../feature/AuthContext";
import { likePost, removeLikeFromPost } from "../feature/posts/postsSlice";


export default function ProfilePostCard({ post }) {

    const { content, id: postId } = post;
    const [likes, setLikes] = useState(post.likes || [])

    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;

    const isLiked = likes.includes(userId);

    // const token = localStorage.getItem("authToken");
    // const decode = jwtDecode(token);
    // const userId = decode.id;

    const pic = 'https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg';
    // const BASE_URL = "https://85e26881-9d33-47ea-98c8-e946f60ddfca-00-1ciplofky6m83.spock.replit.dev"

    // useEffect(() => {
    //     fetch(`${BASE_URL}/likes/posts/${postId}`)
    //         .then((response) => response.json())
    //         .then((data) => setLikes(data))
    //         .catch((error) => console.error("Error:", error))
    // }, [postId])

    // const isLiked = likes.some((like) => like.user_id === userId);

    const handleLike = () => (isLiked ? removeFromLikes() : addToLikes());

    const addToLikes = () => {
        setLikes([...likes, userId]);
        dispatch(likePost({ userId, postId }));
    }

    const removeFromLikes = () => {
        setLikes(likes.filter((id) => id !== userId));
        dispatch(removeLikeFromPost({ userId, postId }))
    }

    return (
        <Row
            className="p-3"
            style={{
                borderTop: '1px solid #D3D3D3',
                borderBottom: '1px solid #D3D3D3'
            }}
        >
            <Col sm={1}>
                <Image src={pic} fluid roundedCircle />
            </Col>

            <Col>
                <strong>Haris</strong>
                <span> @Haris.samingan - Apr 16</span>
                <p>{content}</p>
                <div className="d-flex justify-content-between">
                    <Button variant="light">
                        <i className="bi bi-chat"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-repeat"></i>
                    </Button>
                    <Button variant="light" onClick={handleLike}>
                        {isLiked ? (
                            <i className="bi bi-heart-fill text-danger"></i>
                        ) : (
                            <i className="bi bi-heart"></i>
                        )}
                        {likes.length}
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-graph-up"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-upload"></i>
                    </Button>
                </div>
            </Col>

        </Row>
    )
}
