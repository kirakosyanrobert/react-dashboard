import React from 'react';
import { Modal as BaseModal } from 'react-bootstrap';

function Modal ({open, children, onClose, title, size = 'md'}) {

    return (
        <BaseModal show={open} onHide={onClose} size={size}>
            <BaseModal.Header closeButton>
                <BaseModal.Title>{title}</BaseModal.Title>
            </BaseModal.Header>
                {children}
        </BaseModal>
    )
}

Modal.Body = BaseModal.Body;
Modal.Footer = BaseModal.Footer;

export default Modal;
