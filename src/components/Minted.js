import React from "react";
import { useContract } from "../contexts/ContractContext";
import Label from "./shared/Label";
import * as s from "./../styles/globalStyles";

const Minted = () => {
  const { totalSupply, maxSupply, imageURIs } = useContract();

  return (
    <s.Section>
      <s.Wrapper>
        <s.SectionTitle>
          Minted NFTs
        </s.SectionTitle>

        {imageURIs.length > 0 ?
          <>
            <s.Container
              fd={"row"}
              style={{
                overflow: "auto"
              }}
            >
              {imageURIs.map(function (url, i) {
                return (
                  <img
                    key={i}
                    src={url}
                    width="128"
                    height="128"
                    style={{
                      marginRight: "8px",
                      marginTop: "12px",
                      borderRadius: 8,
                      border: "1px solid var(--djng-dark)"
                    }} />
                )
              })}

              <img
                key={"osb"}
                src={"/config/images/opensea-banner.svg"}
                style={{
                  marginTop: "12px",
                  borderRadius: 8,
                  border: "1px solid var(--djng-dark)",
                  cursor: "pointer"
                }}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "https://opensea.io/collection/millionlion"
                }}
              />
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
              <Label
                textSize={12}
                hasAction={false}
                imageSize={"16px"}
                imageStyle={{
                  position: "relative",
                  marginRight: "4px",
                  marginBottom: "4px"
                }}
                imageSource={"/config/images/hashtag-svgrepo-com.svg"}
                text={`${maxSupply - totalSupply} (remaining)`}
              />
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
              <img src={"/config/animations/spinner.svg"} />
            </s.Container>
          </>
        }
      </s.Wrapper>
    </s.Section>
  )
}

export default Minted;
