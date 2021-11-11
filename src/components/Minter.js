import React, { useState } from "react";
import { useWallet } from "./../contexts/WalletContext";
import { useContract } from "../contexts/ContractContext";
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
    <s.Container
      jc={"center"}
      ai={"center"}
      style={{
        backgroundColor: "var(--accent)",
        padding: 24,
        borderRadius: 24,
      }}
    >
      <div style={{ height: "204px", width: "204px", textAlign: "center" }}>
        <img src={"/config/images/price.svg"} />
        {Number(totalSupply) >= CONFIG.MAX_SUPPLY ? (
          <>
            <s.TextTitle
              style={{ textAlign: "center", color: "var(--accent-text)" }}
            >
              The sale has ended.
            </s.TextTitle>
            <s.TextDescription
              style={{ textAlign: "center", color: "var(--accent-text)" }}
            >
              You can still find {CONFIG.NFT_NAME} on
            </s.TextDescription>
            <s.SpacerSmall />
            <s.StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
              {CONFIG.MARKETPLACE}
            </s.StyledLink>
          </>
        ) : (
          <>
            <s.SpacerLarge />
            {account === "" ? (
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
                  {account}
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
            ) : (
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
              </>
            )}
          </>
        )}
      </div>
    </s.Container>
  )
}

export default Minter;
