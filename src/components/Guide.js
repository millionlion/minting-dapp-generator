import React from "react";
import styled from "styled-components";
import * as s from "./../styles/globalStyles";

export const StyledPreview = styled.img`
  width: 204px;
  transition: width 0.5s;
  transition: height 0.5s;
  @media (max-width: 600px) {
    display: none;
  }
`;

const Guide = () => {
  return (
    <s.Container
      jc={"center"}
      ai={"center"}
      style={{
        backgroundColor: "var(--accent)",
        borderRadius: 24,
        padding: 24,
      }}
    >
      <div style={{ height: "204px", width: "204px" }}>
        <StyledPreview alt={"preview"} src={"/config/images/preview.png"} style={{ borderRadius: 24 }} />
      </div>
    </s.Container>
  )
}

export default Guide;
