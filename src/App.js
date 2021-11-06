import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

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

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 128px;
  @media (min-width: 767px) {
    width: 128px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledPreview = styled.img`
  width: 204px;
  transition: width 0.5s;
  transition: height 0.5s;
  @media (max-width: 600px) {
    display: none;
  }
`;

export const StyledHeader = styled.img`
  position: absolute;
  top: 48px;
  right: 48px;
  width: 20%
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px dashed var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

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
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={"left"}
        style={{ padding: 24, backgroundColor: "var(--primary)" }}
      >
        <s.Container ai={"center"} jc={"left"} fd={"row"}>
          <StyledLogo alt={"logo"} src={"/config/images/logo.png"} />
          <s.TextTitle
            style={{
              textAlign: "center",
              fontSize: 50,
              fontWeight: "bold",
              color: "var(--accent-text)",
            }}
          >
            {data.totalSupply} / {CONFIG.MAX_SUPPLY}
          </s.TextTitle>
          <StyledHeader alt={"header"} src={"/config/images/header.svg"} />
        </s.Container>

        <s.Container ai={"center"} jc={"left"} fd={"row"}>
          <s.TextDescription
            style={{
              textAlign: "left",
              color: "var(--primary-text)",
              padding: 24
            }}
          >
            <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
              {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
            </StyledLink>
          </s.TextDescription>
        </s.Container>
        <s.TextTitle
          style={{
            textAlign: "center",
            fontSize: 24,
            color: "var(--primary-text)",
          }}
        >
          Unveiling - Dec, 2021
        </s.TextTitle>
        <s.SpacerSmall />
        <ResponsiveWrapper>
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
          <s.SpacerLarge />
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
              {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
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
                  <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                    {CONFIG.MARKETPLACE}
                  </StyledLink>
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
                          getData();
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
                            getData();
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
          <s.SpacerLarge />
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
              <s.TextTitle
                style={{
                  textAlign: "left",
                  fontSize: 18,
                  color: "var(--djng-light)",
                }}
              >
                Minted NFTs
              </s.TextTitle>

              {data.imageURIs.length > 0 ?
                <>
                  {data.imageURIs.map((url) => {
                    return (
                      <img src={url}
                        width="32"
                        height="32"
                        style={{
                          marginRight: "8px",
                          marginTop: "8px",
                          borderRadius: 8,
                          border: "1px solid var(--djng-dark)"
                        }} />
                    )
                  })}
                  <s.TextTitle
                    style={{
                      textAlign: "left",
                      fontSize: 12,
                      color: "var(--mtrx-light)",
                      marginTop: 8
                    }}
                  >
                    Left: {data.maxSupply - data.totalSupply}
                  </s.TextTitle>
                </>
                :
                <>
                  <s.Container
                    jc={"center"}
                    ai={"center"}
                    style={{
                      height: "90%"
                    }}
                  >
                    <img src={"/config/images/lock.svg"} />
                  </s.Container>
                </>
              }
            </div>
          </s.Container>
        </ResponsiveWrapper>
        <s.SpacerSmall />
        <StyledLink
          href={CONFIG.LIGHTPAPER}
          style={{
            textAlign: "center",
            color: "var(--primary-text)",
          }}
          download
        >
          Lightpaper
        </StyledLink>
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.TextDescription
          style={{
            textAlign: "left",
            color: "var(--dark-gray)",
            paddingLeft: "24px"
          }}
        >
          © 2021 Million Lion - ml@millionlion.org - Inspired by HashLips
        </s.TextDescription>
      </s.Container>
    </s.Screen>
  );
}

export default App;
