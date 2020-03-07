import React from 'react';
import { Button as BaseButton } from 'react-bootstrap';

export const ButtonVariants = {
    Primary: 'primary',
    Secondary: 'secondary',
    Success: 'success',
    Warning: 'warning',
    Danger: 'danger',
    Info: 'info',
    Light: 'light',
    Dark: 'dark',
    Link: 'link'
}

export const ButtonActionTypes = {
    Button: 'button',
    Submit: 'submit',
    Reset: 'reset'
}

export const ButtonSizes = {
   Large: 'lg',
   Medium: 'md',
   Small: 'sm'
}

//TODO: add Loading, Left and Right Icons for Button
export function Button({
    title,
    outlined = false,
    variant = ButtonVariants.Secondary,
    type = ButtonActionTypes.Button,
    size = ButtonSizes.Medium,
    block = false,
    loading= false,
    disabled = false || loading,
    onClick
}) {
    return (
        <BaseButton
            variant={outlined ? `outline-${variant}` : variant}
            type={type}
            size={size}
            block={block}
            disabled={disabled}
            onClick={onClick}
        >
            {title}
        </BaseButton>
    )
}