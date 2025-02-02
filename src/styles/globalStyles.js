import styled from "styled-components";

// Used for wrapping a page component
export const Screen = styled.div`
  background-color: var(--primary);
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// Used for providing space between components
export const SpacerXSmall = styled.div`
  height: 8px;
  width: 8px;
`;

// Used for providing space between components
export const SpacerSmall = styled.div`
  height: 16px;
  width: 16px;
`;

// Used for providing space between components
export const SpacerMedium = styled.div`
  height: 24px;
  width: 24px;
`;

// Used for providing space between components
export const SpacerLarge = styled.div`
  height: 32px;
  width: 32px;
`;

// Used for providing a wrapper around a component
export const Container = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: 512px 512px;
  background-position: center;
`;

export const Section = styled(Container)`
  justify-content: center:
  align-items: center;
  background-color: var(--accent);
  border-radius: 24px;
  padding: 24px;
`;

export const TextTitle = styled.p`
  color: var(--primary-text);
  font-size: 18px;
  font-weight: 500;
  line-height: 1.6;
`;

export const SectionTitle = styled(TextTitle)`
  text-align: left;
  font-size: 18;
  color: var(--djng-light);
  margin-top: -12px;
  margin-bottom: 8px;
`;


export const TextSubTitle = styled.p`
  color: var(--primary-text);
  font-size: 18px;
  line-height: 1.6;
`;

export const TextDescription = styled.p`
  color: var(--primary-text);
  font-size: 14px;
  line-height: 1.6;
`;

export const StyledClickable = styled.div`
  :active {
    opacity: 0.6;
  }
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

export const Wrapper = styled.div`
  height: 204px;
  width: 204px;
  position: relative;
`;

export const InnerWrapper = styled.div`
  overflow: auto;
  box-shadow: inset 0px 0px 8px 5px rgba(0,0,0,0.2);
  border-radius: 16px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 12px;
`;

export const SectionFooter = styled.div`
  font-size: 12px;
  color: var(--djng);
  bottom: -16px;
  position: absolute;
`;
