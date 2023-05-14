import React, { useState } from "react";
import StudentImage from "../asserts/images/Student-Image.jpg";
import styled from "styled-components";
import { MdOutlineQrCode } from "react-icons/md";
import { Button } from "../componentStudent/ButtonElement";
import Modal from "react-modal";
import QRCode from "qrcode";
import QRGenerator from "../miniPages/teachers/QRGenerator";

const StudentHero = () => {
  const [hover, setHover] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  //qrcode data
  const [QRsrc, setQRSRC] = useState();

  //  crating a qrcode
  const crearQR = () => {
    setModalIsOpen(true);
    let today = new Date();

    const values = {
      inscription: sessionStorage.getItem("inscription"),
      group: sessionStorage.getItem("student_group"),
      level: sessionStorage.getItem("level"),
      sectionSpeciality: sessionStorage.getItem("section_speciality"),
      date: today.toLocaleDateString(),
    };

    const payload = JSON.stringify(values);

    QRCode.toDataURL(payload).then((data) => {
      setQRSRC(data);
    });
  };

  const onHover = () => {
    setHover(!hover);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      padding: 0,
      border: "none",
      borderRadius: "20px",
      overflow: "hidden",
      width: "350px",
      height: "350px",
    },
    overlay: {
      backgroundColor: "rgba(10, 11, 13, 0.75)",
    },
  };

  return (
    <>
      {!modalIsOpen ? (
        <HeroContainer id="home">
          <HeroBg>
            <VideoBg src={StudentImage} />
          </HeroBg>
          <HeroContent>
            <HeroH1>Investing in Knowledge & Your Future</HeroH1>
            <HeroP>
              {" "}
              With the help of this app, manage your presence record in
              classrooms. Also make justifications for sessions previously
              missed.{" "}
            </HeroP>
            <HeroBtnWrapper>
              <Button
                onClick={() => crearQR()}
                to="signup"
                style={{ fontWeight: "bold" }}
                onMouseLeave={onHover}
                onMouseEnter={onHover}
                primary="true"
                dark="true"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                Generate QR code <CodeIcon />
              </Button>
            </HeroBtnWrapper>
          </HeroContent>
        </HeroContainer>
      ) : (
        <ModalContainer>
          <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            onRequestClose={() => setModalIsOpen(false)}
            ariaHideApp={false}
          >
            <QRGenerator QRsrc={QRsrc} setModalIsOpen={setModalIsOpen} />
          </Modal>
        </ModalContainer>
      )}
    </>
  );
};

export default StudentHero;

const HeroContainer = styled.div`
  background: #0c0c0c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: 90vh;
  position: relative;
  z-index: 1;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.6) 100%
      ),
      linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
    z-index: 2;
  }
`;

const ModalContainer = styled.div``;

const HeroBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0.3;
`;

const VideoBg = styled.img`
  width: 100%;
  height: 100%;
  --o-object-fit: cover;
  object-fit: cover;
  background: #232a34;
`;

const HeroContent = styled.div`
  z-index: 3;
  max-width: 1200px;
  position: absolute;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroH1 = styled.h1`
  color: #fff;
  font-size: 48px;
  text-align: center;

  @media Screen and (max-width: 760px) {
    font-size: 40px;
  }

  @media Screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

const HeroP = styled.p`
  margin-top: 24px;
  color: #c4c4c4;
  font-size: 22px;
  text-align: center;
  max-width: 600px;

  @media Screen and (max-width: 760px) {
    font-size: 24px;
  }

  @media Screen and (max-width: 480px) {
    font-size: 18px;
  }
`;
const HeroBtnWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CodeIcon = styled(MdOutlineQrCode)`
  margin-left: 8px;
  font-size: 20px;
`;
