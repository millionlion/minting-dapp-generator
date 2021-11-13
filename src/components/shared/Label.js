import React from 'react';

const Label = ({
    imageSource,
    imageSize,
    imageStyle,
    hasAction,
    text,
    textSize,
}) => {

    return (
        <span
            style={{
                display: 'flex',
                fontSize: textSize,
                cursor: hasAction ? 'pointer' : 'unset'
            }}>
            <img
                src={imageSource}
                height={imageSize}
                width={imageSize}
                style={imageStyle} />
            {text}
        </span>
    )
}

export default Label;