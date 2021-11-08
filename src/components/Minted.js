import React from "react";
import { useSelector } from "react-redux";
import * as s from "./../styles/globalStyles";

const Minted = () => {
  const data = useSelector((state) => state.data);

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
          overflow: "auto",
          height: "204px",
          width: "204px"
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

        {data.imageURIs.length > 0 ?
          <>
            <s.TextTitle
              style={{
                textAlign: "left",
                fontSize: 12,
                color: "var(--mtrx-light)",
                marginBottom: 8
              }}
            >
              Left: {data.maxSupply - data.totalSupply}
            </s.TextTitle>
            {data.imageURIs.map(function (url, i) {
              return (
                <img
                  key={i}
                  src={url}
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
  )
}

export default Minted;
