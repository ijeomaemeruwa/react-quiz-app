import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import { TimePicker } from "antd";
import "antd/dist/antd.css";
// import { Moment } from "moment";


const SetTimerModal = (props) => {

const [time, setTime] = useState();

return (
<>
<Modal 
    {...props}
    size="md"  
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Modal.Header>Set Timer</Modal.Header>
    <Modal.Body>
    <TimePicker
     showNow={false}
     value={time}
     size="large"
     style={{ width: "100%" }}
     onChange={(time, timeString) => {
        setTime(time);
        props.setTimer(timeString);
    }}
    />
    </Modal.Body>
    <Modal.Footer>
    <p 
     onClick={props.onHide} 
     style={{ cursor: 'pointer', color: 'var(--accent-main)', fontWeight: '600'}}>
     SET
    </p>
    </Modal.Footer>
    </Modal>
</>
)
}

export default SetTimerModal;
