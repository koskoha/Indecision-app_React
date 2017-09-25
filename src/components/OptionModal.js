import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) =>(
    <Modal
        isOpen = {!!props.selectedOption}
        contentLabel="Selected Option"
        onRequestClose = {props.handleClearSelection}
    >
        <h3>Selected Option</h3>
        {props.selectedOption && <p>{props.selectedOption}</p>}
        <button onClick={props.handleClearSelection}>OK</button>
    </Modal>
)

export default OptionModal;