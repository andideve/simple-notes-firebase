import { useState, useRef } from "react";
import { dateFormat } from "../../../functions";
import { Card } from "react-bootstrap";
import useRootClose from "react-overlays/useRootClose";

export default function Note({ title, time, onEdit, onDelete, ...otherProps }) {
    const ref = useRef();
    const [showOptions, setShowOptions] = useState(false);
    const handleRootClose = () => setShowOptions(false);

    const handleShow = (event) => {
        event.stopPropagation();
        setShowOptions(!showOptions);
    }

    useRootClose(ref, handleRootClose, {
        disabled: !showOptions,
    });

    return (
        <Card className="note" {...otherProps}>
            <Card.Body>
                <h1 className="h5">{title}</h1>
                <time dateTime={time}>{dateFormat(time)}</time>
                <button className="options-trigger" onClick={handleShow}>...</button>
                <div className={`options ${showOptions ? "show" : ""}`} ref={ref}>
                    <ul
                        onClick={(event) => {
                            event.stopPropagation();
                            setShowOptions(false);}
                        }
                    >
                        <li onClick={onEdit}>edit</li>
                        <li onClick={onDelete}>hapus</li>
                    </ul>
                </div>
            </Card.Body>
        </Card>
    );
}

Note.defaultProps = {
    title: "",
    time: new Date(),
    onEdit: function() {},
    onDelete: function() {},
};
