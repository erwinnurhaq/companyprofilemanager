import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default ({ children, isOpen, title, onBtn1, btn1Text, onBtn2, btn2Text }) => {
    return (
        <Modal isOpen={isOpen} className='modal-dialog-centered' backdrop={'static'}>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>
            <ModalFooter>
                {onBtn2 ? <Button color="dark" onClick={onBtn2}>{btn2Text}</Button> : null}
                <Button color="secondary" onClick={onBtn1}>{btn1Text}</Button>
            </ModalFooter>
        </Modal>
    )
}
