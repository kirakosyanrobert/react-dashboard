import React from 'react';
import * as Icons from 'react-icons/fa';

export function Icon ({name, size = 20, color = '#fff'}) {
    const IconView = Icons[name];
    return (
      <IconView size={size} color={color} />
    )
}