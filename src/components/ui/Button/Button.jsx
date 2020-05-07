import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { Button as BaseButton } from 'react-bootstrap';

import './Button.scss';
import { Icon } from '../Icon';

export const ButtonVariants = {
    Primary: 'primary',
    Secondary: 'secondary',
    Success: 'success',
    Danger: 'danger',
    Info: 'info',
    Dark: 'dark',
    Link: 'link',
    Light: 'light'
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
    className,
    title,
    icon,
    iconColor = '#fff',
    outlined = false,
    variant = ButtonVariants.Secondary,
    type = ButtonActionTypes.Button,
    size = ButtonSizes.Medium,
    block = false,
    loading= false,
    disabled = false || loading,
    leftIcon,
    rightIcon,
    onClick
}) {
    if(!!icon) {
        return (
            <BaseButton
            variant={outlined ? `outline-${variant}` : variant}
            type={type}
            size={size}
            block={block}
            disabled={disabled}
            onClick={onClick}
            className={`base-button ${className}`}
            >
                <Icon name={icon} size={18} color={iconColor} />
            </BaseButton>
        )
    }

    return (
        <BaseButton
            variant={outlined ? `outline-${variant}` : variant}
            type={type}
            size={size}
            block={block}
            disabled={disabled}
            onClick={onClick}
            className={`base-button ${className}`}
        >
            {!!leftIcon && <Icon name={leftIcon} size={18} color={iconColor} />}

            <p className={`mb-0 ${loading ? 'button-title-hide' : 'button-title-show'} ${!!leftIcon ? 'withLeftIcon' : ''} ${!!rightIcon ? 'withRightIcon' : ''}`}>
                {title}
            </p>
            {loading && 
                <div className="loader-container">
                    <ClipLoader size={15} color={'#fff'} />
                </div>
            }

            {!!rightIcon && <Icon name={rightIcon} size={18} color={iconColor} />}
        </BaseButton>
    )
}