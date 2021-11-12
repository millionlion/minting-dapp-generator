import React from "react";
import { useContract } from "../contexts/ContractContext";
import * as s from "./../styles/globalStyles";

const Minted = () => {
  const { totalSupply, maxSupply, imageURIs } = useContract();

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
      <div
        style={{
          borderRadius: "8px",
          height: "204px",
          width: "204px",
          position: "relative"
        }}>
        <s.TextTitle
          style={{
            textAlign: "left",
            fontSize: 18,
            color: "var(--djng-light)",
          }}
        >
          Minted NFTs
        </s.TextTitle>

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
                color: "var(--mtrx-dark)",
                bottom: "0",
                position: "absolute"
              }}
            >
              Left: {maxSupply - totalSupply}
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
      </div>
    </s.Container>
  )
}

export default Minted;
