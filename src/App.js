import React, { useEffect, useState } from "react";
import { useContract } from "./contexts/ContractContext";
import Guide from "./components/Guide";
import Minter from "./components/Minter";
import Minted from "./components/Minted";
import styled from "styled-components";
import * as s from "./styles/globalStyles";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

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

export const StyledHeader = styled.img`
  position: absolute;
  top: 48px;
  right: 48px;
  width: 20%
`;

function App() {
  const { totalSupply } = useContract();
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
            {totalSupply} / {CONFIG.MAX_SUPPLY}
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
            <s.StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
              {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
            </s.StyledLink>
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
          <Guide />
          <s.SpacerLarge />
          <Minter CONFIG={CONFIG} />
          <s.SpacerLarge />
          <Minted />
        </ResponsiveWrapper>
        <s.SpacerSmall />
        <s.StyledLink
          href={CONFIG.LIGHTPAPER}
          style={{
            textAlign: "center",
            color: "var(--primary-text)",
          }}
          download
        >
          Lightpaper
        </s.StyledLink>
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
