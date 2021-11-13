import React from 'react';

const ActionParagraph = ({
  imageSource,
  imageSize,
  imageStyle,
  text,
  action
}) => {

  return (
    <span
      style={{
        color: "var(--dark-gray)",
        display: 'flex',
        fontSize: 12,
        lineHeight: 1.6,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onClick={action}
    >
      {text}
      <img
        src={imageSource}
        height={imageSize}
        width={imageSize}
        style={imageStyle}
      />
    </span>
  )
}

export default ActionParagraph;