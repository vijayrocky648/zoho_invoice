import {Modal,Button} from 'react-bootstrap'
function COMMONMODEL(props) {
    return (
        <Modal show={props.isVisible} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default COMMONMODEL;


