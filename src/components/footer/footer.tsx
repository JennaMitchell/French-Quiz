import {
  TopContainer,
  ColumnOne,
  ColumnTwo,
  SocialIcons,
  ContactInfoContainer,
  StyledContactText,
  StyledFooterHeading,
  StyledFooterNavLink,
  StyledLink,
} from "./footer-styled-components";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { Typography, Grid } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <TopContainer>
      <ColumnOne sx={{ justifySelf: "flex-start" }}>
        <Typography
          sx={{
            color: "secondary.light",
            fontSize: "22px",
            marginBottom: "15px",
            textAlign: "left",

            "@media (max-width:740px)": {
              fontSize: "16px",
            },
            "@media (max-width:758px)": {
              fontSize: "12px",
            },
            "@media(max-width:475px)": {
              fontSize: "22px",
              width: "250px",
            },
          }}
        >
          French Quiz
        </Typography>
        <Typography
          sx={{
            color: "secondary.light",
            fontSize: "18px",
            marginBottom: "15px",
            textAlign: "left",
            width: "250px",
            "@media (max-width:1150px)": {
              fontSize: "16px",
            },
            "@media (max-width:1050px)": {
              width: "200px",
            },
            "@media (max-width:980px)": {
              fontSize: "14px",
            },
            "@media (max-width:880px)": {
              fontSize: "12px",
              width: "175px",
            },
            "@media (max-width:800px)": {
              fontSize: "10px",
              width: "150px",
            },
            "@media (max-width:680px)": {
              width: "97.5px",
              fontSize: "8px",
            },
            "@media(max-width:600px)": {
              fontSize: "8px",
              width: "97.5px",
            },
            "@media(max-width:475px)": {
              fontSize: "16px",
              width: "300px",
            },
            "@media(max-width:350px)": {
              fontSize: "16px",
              width: "280px",
            },
          }}
        >
          Improving students french skills one quiz at a time.
        </Typography>
        <Grid
          container
          columns={4}
          sx={{
            width: "175px",
            gap: "10px",
            "@media (max-width:740px)": {
              width: "120px",
            },
            "@media (max-width:680px)": {
              width: "97.5px",
            },
            "@media(max-width:475px)": {
              width: "175px",
            },
          }}
        >
          <SocialIcons>
            <FacebookIcon
              sx={{
                "@media (max-width:1050px)": {
                  width: "max(20px,20px)",
                  height: "max(20px,20px)",
                },
                "@media (max-width:880px)": {
                  width: "max(15px,15px)",
                  height: "max(15px,15px)",
                },
                "@media (max-width:710px)": {
                  width: "max(10px,10px)",
                  height: "max(10px,10px)",
                },
                "@media(max-width:475px)": {
                  width: "max(20px,20px)",
                  height: "max(20px,20px)",
                },
                color: "secondary.dark",
              }}
            />
          </SocialIcons>

          <SocialIcons>
            <TwitterIcon
              sx={{
                "@media (max-width:1050px)": {
                  width: "max(20px,20px)",
                  height: "max(20px,20px)",
                },
                "@media (max-width:880px)": {
                  width: "max(15px,15px)",
                  height: "max(15px,15px)",
                },
                "@media (max-width:710px)": {
                  width: "max(10px,10px)",
                  height: "max(10px,10px)",
                },
                "@media(max-width:475px)": {
                  width: "max(20px,20px)",
                  height: "max(20px,20px)",
                },
                color: "secondary.dark",
              }}
            />
          </SocialIcons>

          <SocialIcons>
            <LinkedInIcon
              sx={{
                color: "secondary.dark",
                "@media (max-width:1050px)": {
                  width: "max(20px,20px)",
                  height: "max(20px,20px)",
                },
                "@media (max-width:880px)": {
                  width: "max(15px,15px)",
                  height: "max(15px,15px)",
                },
                "@media (max-width:710px)": {
                  width: "max(10px,10px)",
                  height: "max(10px,10px)",
                },
                "@media(max-width:475px)": {
                  width: "max(20px,20px)",
                  height: "max(20px,20px)",
                },
              }}
            />
          </SocialIcons>

          <SocialIcons>
            <InstagramIcon
              sx={{
                "@media (max-width:1050px)": {
                  width: "max(20px,20px)",
                  height: "max(20px,20px)",
                },
                "@media (max-width:880px)": {
                  width: "max(15px,15px)",
                  height: "max(15px,15px)",
                },
                "@media (max-width:710px)": {
                  width: "max(10px,10px)",
                  height: "max(10px,10px)",
                },
                "@media(max-width:475px)": {
                  width: "max(20px,20px)",
                  height: "max(20px,20px)",
                },
                color: "secondary.dark",
              }}
            />
          </SocialIcons>
        </Grid>
      </ColumnOne>
      <ColumnTwo>
        <StyledFooterHeading>Explore</StyledFooterHeading>
        <StyledFooterNavLink to="/home">Home</StyledFooterNavLink>
        <StyledFooterNavLink to="/quiz">Quiz</StyledFooterNavLink>
        <StyledFooterNavLink to="/flashcards">Flashcards</StyledFooterNavLink>
      </ColumnTwo>
      <ColumnTwo>
        <StyledFooterHeading>Resources</StyledFooterHeading>
        <StyledLink href="https://www.duolingo.com/">Doulingo</StyledLink>
        <StyledLink href="https://www.memrise.com/">Memrise</StyledLink>
        <StyledLink href="https://www.babbel.com/">Babbel</StyledLink>
      </ColumnTwo>
      <ColumnTwo>
        <StyledFooterHeading>Contact</StyledFooterHeading>
        <ContactInfoContainer>
          <LocalPhoneIcon
            sx={{
              "@media (max-width:1050px)": {
                width: "max(20px,20px)",
                height: "max(20px,20px)",
              },
              "@media (max-width:880px)": {
                width: "max(15px,15px)",
                height: "max(15px,15px)",
              },
              "@media(max-width:475px)": {
                width: "max(20px,20px)",
                height: "max(20px,20px)",
              },
            }}
          />
          <StyledContactText>(555) 555-5555</StyledContactText>
        </ContactInfoContainer>
        <ContactInfoContainer>
          <LocationOnIcon
            sx={{
              "@media (max-width:1050px)": {
                width: "max(20px,20px)",
                height: "max(20px,20px)",
              },
              "@media (max-width:880px)": {
                width: "max(15px,15px)",
                height: "max(15px,15px)",
              },
              "@media(max-width:475px)": {
                width: "max(20px,20px)",
                height: "max(20px,20px)",
              },
            }}
          />
          <StyledContactText>France ?</StyledContactText>
        </ContactInfoContainer>
        <ContactInfoContainer>
          <EmailIcon
            sx={{
              "@media (max-width:1050px)": {
                width: "max(20px,20px)",
                height: "max(20px,20px)",
              },
              "@media (max-width:880px)": {
                width: "max(15px,15px)",
                height: "max(15px,15px)",
              },
              "@media(max-width:475px)": {
                width: "max(20px,20px)",
                height: "max(20px,20px)",
              },
            }}
          />
          <StyledContactText>Email TBD</StyledContactText>
        </ContactInfoContainer>
      </ColumnTwo>
    </TopContainer>
  );
};
export default Footer;
