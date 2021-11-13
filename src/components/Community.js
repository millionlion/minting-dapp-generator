import React, { useState } from "react";
import { useCommunity } from "../contexts/CommunityContext";
import ActionParagraph from "./shared/ActionParagraph";
import Label from "./shared/Label";
import * as s from "../styles/globalStyles";

const Community = () => {
  const { walletBalance } = useCommunity();
  const [showHowTo, setShowHowTo] = useState(false);

  const goToGov = (e) => {
    e.preventDefault();
    window.open("https://gov.milliontoken.org");
  }

  const copyToClipboard = (e) => {
    e.preventDefault();

    let text = "Title \n";
    text += "ML - Community Wallet - [...] \n\n";
    text += "Body \n";
    text += "Reason: [...] \n";
    text += "ERC-20 address: [...] \n";
    text += "Amount: [...] \n";

    try {
      navigator.clipboard.writeText(text);
      console.log(text);
    } catch (error) {
      console.log("Failed to copy");
    }
  }

  return (
    <s.Section>
      <s.Wrapper>
        <s.SectionTitle>
          Community wallet
        </s.SectionTitle>

        <s.Container
          ai={"center"}
          jc={"center"}
          style={{
            height: "80%"
          }}
        >
          {showHowTo === false ?
            <>
              <s.TextTitle
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  color: "var(--mtrx-light)",
                }}
              >
                <Label
                  textSize={28}
                  hasAction={false}
                  imageSize={"48px"}
                  imageStyle={{
                    position: "relative",
                    left: "4px"
                  }}
                  imageSource={"/config/images/polygon-logo.svg"}
                  text={walletBalance}
                />
              </s.TextTitle>
            </>
            :
            <s.InnerWrapper>
              <ActionParagraph
                imageSource={"/config/images/connect-svgrepo-com.svg"}
                imageSize={"24px"}
                imageStyle={{
                  position: "relative",
                  cursor: "pointer"
                }}
                text={"is under the jurisdiction of https://gov.milliontoken.org"}
                action={goToGov}
              />

              <s.SpacerSmall />

              <ActionParagraph
                imageSource={"/config/images/copy-svgrepo-com.svg"}
                imageSize={"16px"}
                imageStyle={{
                  position: "relative",
                  cursor: "pointer",
                  marginRight: "4px",
                  marginBottom: "4px"
                }}
                text={"Create a proposal using the following format:"}
                action={copyToClipboard}
              />

              <s.SpacerSmall />
              <Template />
            </s.InnerWrapper>
          }
        </s.Container>
        <s.SectionFooter
          onClick={(e) => {
            e.preventDefault();
            setShowHowTo(!showHowTo);
          }}
        >
          <Label
            textSize={12}
            hasAction={true}
            imageSize={"12px"}
            imageStyle={{
              position: "relative",
              marginRight: "4px",
              marginBottom: "4px"
            }}
            imageSource={
              !showHowTo
                ? "/config/images/scroll-svgrepo-com.svg"
                : "/config/images/home-svgrepo-com.svg"
            }
            text={
              !showHowTo
                ? "How to request funds?"
                : "back"}
          />
        </s.SectionFooter>
      </s.Wrapper>
    </s.Section>
  )
}

const Template = () => {

  return (
    <s.TextDescription
      style={{
        fontSize: 12,
        color: "var(--mtrx-dark)",
        paddingBottom: "16px"
      }}
    >
      <span style={{ color: "var(--primary-text)" }}>
        Title <br />
      </span>
      ML - Community Wallet - [...] <br />

      <span style={{ color: "var(--primary-text)" }}>
        Body <br />
      </span>
      Reason: [...] <br />
      ERC-20 address: [...] <br />
      Amount: [...] <br />
    </s.TextDescription>
  )
}

export default Community;
