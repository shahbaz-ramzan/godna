"use client";
import { Button, Col, Row, Typography } from "antd";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import loginHeroImg from "../../assets/images/login-hero-img.svg";
import logo from "../../assets/images/logo.png";
interface Props {
  handleSignUp: () => void;
  handleLogin: () => void;
  hasSignedUp;
  loginPending?: boolean;
}

const LoginSection = ({
  handleLogin,
  handleSignUp,
  hasSignedUp,
  loginPending,
}: Props) => {
  const { Title } = Typography;

  const messages = {
    signedUp: "You can now log in using the credentials you just created.",
    default:
      "GoDNA gives you the exact insights you need to adapt, connect, and drive better outcomes, without guessing.",
  };
  const headings = {
    signedUp: "Your account has been created successfully.",
    default: "Understand your client before the first meeting.",
  };

  return (
    <div className="thm-container">
      <Row gutter={[24, 32]} align="middle" className="login-hero-row">
        <Col xs={24} md={16}>
          <div className="lh-content">
            <img src={logo.src} alt="GoDNA Logo" className="login-logo" />
            <Title level={1}>
              {hasSignedUp ? headings.signedUp : headings.default}
            </Title>
            <p>{hasSignedUp ? messages.signedUp : messages.default}</p>
            <div className="lh-actions">
              <Button
                type="primary"
                className="login-btn"
                icon={<ArrowRight />}
                onClick={handleLogin}
                loading={loginPending}
                disabled={loginPending}
              >
                Log In
              </Button>
                <Button
                  className="signup-btn"
                  onClick={handleSignUp}
                  disabled={loginPending}
                >
                  Sign Up
                </Button>
            </div>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div className="lh-image-wrap">
            <Image
              src={loginHeroImg}
              alt="Login Hero"
              className="login-hero-image"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginSection;
