import React from 'react';
import { Modal as BaseModal } from 'react-bootstrap';

import { Button } from '../Button';
import { useTranslation } from '../../../hooks';

function Modal ({open, children, onClose, title, size = 'md'}) {
    const translate = useTranslation();

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
                    title={translate(({buttons}) => buttons.close)}
                    onClick={onClose}
                />
            </BaseModal.Footer>
        </BaseModal>
    )
}

export default Modal;
