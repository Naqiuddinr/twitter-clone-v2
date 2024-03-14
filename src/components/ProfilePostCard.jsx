
import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";


export default function ProfilePostCard({ content, postId }) {

    const [likesCount, setLikesCount] = useState(0);
    const [like, setLike] = useState(false)

    const pic = 'https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg';

    useEffect(() => {
        fetch(`https://85e26881-9d33-47ea-98c8-e946f60ddfca-00-1ciplofky6m83.spock.replit.dev/likes/posts/${postId}`)
            .then((response) => response.json())
            .then((data) => setLikesCount(data.length))
            .catch((error) => console.error("Error:", error))
    }, [postId])

    async function handleLike() {
        setLike(!like);

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
                        <i className="bi bi-heart" style={{ color: like ? "red" : "" }}> {likesCount}</i>
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
