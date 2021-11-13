import React from "react";
import { useWallet } from "./../contexts/WalletContext";
import { useContract } from "../contexts/ContractContext";
import Label from "./shared/Label";
import styled from "styled-components";
import * as s from "./../styles/globalStyles";

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

const Minter = ({ CONFIG }) => {
  const { totalSupply } = useContract();
  const { account, message, errorMessage, isMinting, connect, mint } = useWallet();

  return (
    <s.Section>
      <s.Wrapper style={{ textAlign: "center" }}>
        <img
          src={"/config/images/price.svg"}
          style={{
            marginTop: "-12px",
            marginBottom: "8px"
          }}
        />
        {Number(totalSupply) >= CONFIG.MAX_SUPPLY ?
          <SoldOut config={CONFIG} />
          :
          <>
            <s.SpacerSmall />
            {account === "" ?
              <>
                <s.Container
                  ai={"center"}
                  jc={"center"}
                  style={{ height: "60%" }}
                >
                  <StyledButton
                    onClick={(e) => {
                      e.preventDefault();
                      connect();

                      // TODO: refresh data
                    }}
                  >
                    CONNECT
                  </StyledButton>
                  {errorMessage !== "" ? (
                    <>
                      <s.SpacerSmall />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {errorMessage}
                      </s.TextDescription>
                    </>
                  ) : null}
                </s.Container>
                <s.TextTitle
                  style={{
                    textAlign: "left",
                    fontSize: 12,
                    color: "var(--djng)",
                    bottom: "-16px",
                    position: "absolute"
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      fontSize: 12,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <img src={"/config/images/lock-svgrepo-com.svg"}
                      height="16px"
                      width="16px"
                      style={{
                        position: "relative",
                        marginRight: "4px",
                        marginBottom: "4px"
                      }}
                    />
                    No connection
                  </span>
                </s.TextTitle>
              </>
              :
              <>
                <s.TextDescription
                  style={{
                    textAlign: "center",
                    color: "var(--accent-text)",
                  }}
                >
                  {message}
                </s.TextDescription>
                <s.SpacerMedium />
                <s.Container ai={"center"} jc={"center"} fd={"row"}>
                  <StyledButton
                    disabled={isMinting ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      mint();

                      // TODO: refresh data
                    }}
                  >
                    {isMinting ? "BUSY" : "BUY"}
                  </StyledButton>
                </s.Container>
                <s.TextTitle
                  style={{
                    textAlign: "left",
                    fontSize: 12,
                    color: "var(--djng)",
                    bottom: "-16px",
                    position: "absolute",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "100%"
                  }}
                >
                  <Label
                    textSize={12}
                    hasAction={false}
                    imageSize={"16px"}
                    imageStyle={{
                      position: "relative",
                      marginRight: "4px",
                      marginBottom: "4px"
                    }}
                    imageSource={"/config/images/unlock-svgrepo-com.svg"}
                    text={`Wallet: ${account.slice(0, 8)}...`}
                  />
                </s.TextTitle>
              </>
            }
          </>
        }
      </s.Wrapper>
    </s.Section>
  )
}

const SoldOut = ({ config }) => {

  return (
    <>
      <s.TextTitle
        style={{ textAlign: "center", color: "var(--accent-text)" }}
      >
        The sale has ended.
      </s.TextTitle>
      <s.TextDescription
        style={{ textAlign: "center", color: "var(--accent-text)" }}
      >
        You can still find {config.NFT_NAME} on
      </s.TextDescription>
      <s.SpacerSmall />
      <s.StyledLink target={"_blank"} href={config.MARKETPLACE_LINK}>
        {config.MARKETPLACE}
      </s.StyledLink>
    </>
  )
}

export default Minter;
