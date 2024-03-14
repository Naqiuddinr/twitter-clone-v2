import { Button } from "react-bootstrap";


export default function IconButton({ isTop, className, onClick, text }) {

    let margin = "";

    if (isTop) {
        margin = "light rounded-pill";

    } else {
        margin = "light rounded-pill";
    }

    const iconMargin = text ? " me-3" : " ";

    return (
        <Button variant={margin} onClick={onClick}>
            <i
                className={className + iconMargin}
                style={{ fontSize: "24px", color: "black" }}
            ></i>
            {text}
        </Button>
    )
}
