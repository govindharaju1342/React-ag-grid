import React from "react";
import { PropTypes } from "prop-types";
import "./Modal.scss";

function Modal(props) {
    const {modalData, closeFunction} = props;
    const {show, content } = modalData
    return (
        <div className="modal" style={{display: !!show ? 'block' : 'none'}} > 
            <div className="modal-content"> 
                <span onClick={()=> {closeFunction(null)}} className="close">&times;</span>
                <p>{content}</p>
            </div>

        </div>
    )
}

Modal.defaultProps = {
    modalData: {},
    closeFunction: ()=>{}
};

Modal.propTypes = {
    modalData: PropTypes.object,
    closeFunction: PropTypes.func
};


export default Modal;