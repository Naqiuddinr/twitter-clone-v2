import { Button, Col, Image, Nav, Row } from "react-bootstrap";
import ProfilePostCard from "./ProfilePostCard";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


export default function ProfileMidBody() {

    const url = 'https://pbs.twimg.com/profile_banners/83072625/1602845571/1500x500';
    const pic = 'https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg'

    const [posts, setPosts] = useState([])

    async function fetchPosts(userId) {

        try {
            const response = await fetch(`https://85e26881-9d33-47ea-98c8-e946f60ddfca-00-1ciplofky6m83.spock.replit.dev/posts/users/${userId}`)

            const data = await response.json();

            setPosts(data)

        } catch (err) {
            console.error("Error: ", err)
        }

        // fetch(`https://85e26881-9d33-47ea-98c8-e946f60ddfca-00-1ciplofky6m83.spock.replit.dev/posts/users/${userId}`)
        //     .then((response) => response.json())
        //     .then((data) => setPosts(data))
        //     .catch((error) => console.error("Error: ", error))
    }

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            fetchPosts(userId);
        }
    }, [posts])

    return (
        <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
            <Image src={url} fluid />
            <br />
            <Image
                src={pic}
                roundedCircle
                style={{
                    width: 150,
                    position: "absolute",
                    top: "140px",
                    border: "4px solid #F8F9FA",
                    marginLeft: 15
                }}
            />

            <Row className="justify-content-end">
                <Col xs="auto">
                    <Button className="rounded-pill mt-2" variant="outline-secondary">
                        Edit Profile
                    </Button>
                </Col>
            </Row>

            <p className="mt-5" style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}>
                Haris
            </p>

            <p style={{ marginBottom: "2px" }}>@Haris.samingan</p>

            <p>I help people switch careers to be a software developer</p>

            <p>Entrepreneur</p>

            <p>
                <strong>271</strong> Following <strong>610</strong> Followers
            </p>

            <Nav variant="underline" defaultActiveKey="/home" justify>
                <Nav.Item>
                    <Nav.Link eventKey="/home" style={{ color: 'black' }}>Tweets</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" style={{ color: 'black' }}>Replies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" style={{ color: 'black' }}>Highlights</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3" style={{ color: 'black' }}>Media</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-4" style={{ color: 'black' }}>Likes</Nav.Link>
                </Nav.Item>
            </Nav>
            {posts.length > 0 && posts.map((post) => (
                <ProfilePostCard key={post.id} content={post.content} postId={post.id} />
            ))}
        </Col>
    )
}
