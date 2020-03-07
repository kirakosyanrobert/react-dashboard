import React from 'react';
import { Modal as BaseModal } from 'react-bootstrap';
import { Button } from '../Button';


function Modal ({open, children, onClose, title, size = 'md'}) {

    return (
        <BaseModal show={open} onHide={onClose} size={size}>
            <BaseModal.Header closeButton>
                <BaseModal.Title>{title}</BaseModal.Title>
            </BaseModal.Header>
            <BaseModal.Body>
                {children}
            </BaseModal.Body>
            <BaseModal.Footer>
                <Button
                    title="Close"
                    onClick={onClose}
                />
            </BaseModal.Footer>
        </BaseModal>
    )
}

export default Modal;
