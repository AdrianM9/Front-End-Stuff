import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "./Button";

export default function DualButton() {
  // Color 0 = light color, Color 1 = dark color
  let headerRef = useRef(null);
  let sectionsRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef()
  ]);

  const [sectionsOffsets, setSectionsOffsets] = useState([]);
  const [sectionsColors, setSectionsColors] = useState([]);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [buttonHeight, setButtonHeight] = useState(0);

  const [lightOffset, setLightOffset] = useState(0);
  const [darkOffset, setDarkOffset] = useState(0);

  useEffect(() => {
    setHeaderHeight(headerRef.current.clientHeight);
    setButtonHeight(headerRef.current.children[0].clientHeight);
    computeSectionsOffsets();
    computeSectionColors();
  }, []);

  useEffect(() => {
    computeButtonColor();
  }, [sectionsColors]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    function handleScroll() {
      computeButtonColor();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  function computeSectionsOffsets() {
    let totalHeight = 0;
    const tempSectionsOffsets = [];

    for (let sectionRef of sectionsRefs.current) {
      tempSectionsOffsets.push(totalHeight);
      totalHeight += sectionRef.current.clientHeight;
    }

    setSectionsOffsets(tempSectionsOffsets);
  }

  function computeSectionColors() {
    const tempSectionsColors = [];

    for (let sectionRef of sectionsRefs.current) {
      tempSectionsColors.push(
        sectionRef.current.dataset.color === "light" ? 0 : 1
      );
    }

    setSectionsColors(tempSectionsColors);
  }

  function computeButtonColor() {
    for (let sectionId in sectionsRefs.current) {
      // Verifying if the header is in changing zone
      // AND if the sections have different colors
      const sectionIndex = parseInt(sectionId);

      if (sectionIndex === 0) {
        continue;
      }

      if (
        window.scrollY + headerHeight > sectionsOffsets[sectionIndex] &&
        window.scrollY < sectionsOffsets[sectionIndex] &&
        sectionsColors[sectionIndex - 1] !== sectionsColors[sectionIndex]
      ) {
        const newOffset =
          window.scrollY + headerHeight - sectionsOffsets[sectionIndex];

        const offset = newOffset > buttonHeight ? buttonHeight : newOffset;

        if (sectionsColors[sectionIndex] === 0) {
          setLightOffset(-offset);
          setDarkOffset(buttonHeight - offset);
        } else {
          setDarkOffset(-offset);
          setLightOffset(buttonHeight - offset);
        }

        return;
      }
    }

    for (let sectionId in sectionsRefs.current) {
      const sectionIndex = parseInt(sectionId);

      if (sectionIndex === 0) {
        continue;
      }

      if (
        window.scrollY > sectionsOffsets[sectionIndex - 1] &&
        window.scrollY <= sectionsOffsets[sectionIndex]
      ) {
        if (sectionsColors[sectionIndex - 1] === 0) {
          setLightOffset(-buttonHeight);
          setDarkOffset(0);
        } else {
          setLightOffset(0);
          setDarkOffset(-buttonHeight);
        }
        return;
      } else if (sectionIndex === sectionsRefs.current.length - 1) {
        if (sectionsColors[sectionIndex] === 0) {
          setLightOffset(-buttonHeight);
          setDarkOffset(0);
        } else {
          setLightOffset(0);
          setDarkOffset(-buttonHeight);
        }
        return;
      }
    }
  }

  return (
    <Wrapper>
      <Header ref={headerRef}>
        <Button lightButtonOffset={lightOffset} darkButtonOffset={darkOffset} />
      </Header>
      <Section
        ref={sectionsRefs.current[0]}
        height={"100vh"}
        data-color={"light"}
        light
      >
        Section 0 is light
      </Section>
      <Section
        ref={sectionsRefs.current[1]}
        height={"50vh"}
        data-color={"dark"}
        dark
      >
        Section 1 is dark
      </Section>
      <Section
        ref={sectionsRefs.current[2]}
        height={"30vh"}
        data-color={"light"}
        light
      >
        Section 2 is light
      </Section>
      <Section
        ref={sectionsRefs.current[3]}
        height={"70vh"}
        data-color={"light"}
        light
      >
        Section 3 is light
      </Section>
      <Section
        ref={sectionsRefs.current[4]}
        height={"80vh"}
        data-color={"dark"}
        dark
      >
        Section 4 is dark
      </Section>
      <Section
        ref={sectionsRefs.current[5]}
        height={"120vh"}
        data-color={"light"}
        light
      >
        Section 5 is light
      </Section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  scroll-behavior: smooth;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 95%;
  margin: auto;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  // background-color: #f005;
  overflow: hidden;
`;

const Section = styled.div`
  height: ${props => props.height || "100vh"};
  background-color: ${props =>
    props.light ? "#fff" : props.dark ? "#000" : "#f00"};
  color: ${props => (props.light ? "#000" : props.dark ? "#fff" : "#00f")};
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
