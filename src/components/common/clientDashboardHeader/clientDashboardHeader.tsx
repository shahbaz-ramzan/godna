import { Button, Tooltip } from "antd";
import React from "react";

const ClientDashboardHeader = ({
  title,
  description,
  showBtn = false,
  primaryLabel,
  primaryOnClick,
  primaryIcon,
  primaryDisabled,
  primaryTooltip,
  secondaryLabel,
  secondaryIcon,
  secondaryOnClick,
  secondaryDisabled,
  secondaryTooltip,
  primaryBtnClass,
  secondaryBtnClass,
}: {
  title: string;
  description: string;
  showBtn?: boolean | React.ReactNode;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryIcon?: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  primaryOnClick?: () => void;
  secondaryOnClick?: () => void;
  primaryDisabled?: boolean;
  secondaryDisabled?: boolean;
  primaryTooltip?: string;
  secondaryTooltip?: string;
  primaryBtnClass?: string;
  secondaryBtnClass?: string;
}) => {
  const [titleText, descriptionText] = [title, description];
  const headerTitle =
    titleText ||
    `Welcome back, <span className="gradient-username">John</span>!`;
  const headerDescription = descriptionText;
  return (
    <div className="dashboard-header-wrapper">
      <div className="dashboard-header">
        <h2 dangerouslySetInnerHTML={{ __html: headerTitle }} />
        <p dangerouslySetInnerHTML={{ __html: headerDescription }} />
      </div>
      {showBtn && (
        <div className="header-btn-wrapper">
          {secondaryLabel && (
            <Tooltip
              title={secondaryDisabled ? secondaryTooltip : undefined}
              mouseEnterDelay={0.3}
            >
              <span>
                <Button
                  className={`${secondaryBtnClass} header-btn`}
                  icon={secondaryIcon}
                  onClick={secondaryOnClick}
                  disabled={secondaryDisabled}
                >
                  {secondaryLabel}
                </Button>
              </span>
            </Tooltip>
          )}
          {primaryLabel && (
            <Tooltip
              title={primaryDisabled ? primaryTooltip : undefined}
              mouseEnterDelay={0.3}
            >
              <span>
                <Button
                  className={`${primaryBtnClass} header-btn`}
                  icon={primaryIcon}
                  onClick={primaryOnClick}
                  disabled={primaryDisabled}
                >
                  {primaryLabel}
                </Button>
              </span>
            </Tooltip>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientDashboardHeader;
