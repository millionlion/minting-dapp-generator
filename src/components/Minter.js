import React, { useState } from "react";
import { connect } from "./../redux/blockchain/blockchainActions";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const { totalSupply } = useContract();
  const blockchain = useSelector((state) => state.blockchain);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `The ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        
        // TODO: refresh data
      });
  };

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
            {blockchain.account === "" ||
              blockchain.smartContract === null ? (
              <s.Container
                ai={"center"}
                jc={"center"}
                style={{ height: "60%" }}
              >
                <StyledButton
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(connect());

                    // TODO: refresh data
                  }}
                >
                  CONNECT
                </StyledButton>
                {blockchain.errorMsg !== "" ? (
                  <>
                    <s.SpacerSmall />
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {blockchain.errorMsg}
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
                  {feedback}
                </s.TextDescription>
                <s.SpacerMedium />
                <s.Container ai={"center"} jc={"center"} fd={"row"}>
                  <StyledButton
                    disabled={claimingNft ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      claimNFTs();

                      // TODO: refresh data
                    }}
                  >
                    {claimingNft ? "BUSY" : "BUY"}
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
