"use client";
import { Button } from "antd";
import { ArrowRight } from "lucide-react";
import React from "react";

interface FeatureDetailProps {
  badgeIcon: React.ReactNode;
  badgeText: string;
  title: string;
  description: string;
  tagline: string;
  reportCard: React.ReactNode;
  reverse?: boolean;
}

export const FeatureDetail: React.FC<FeatureDetailProps> = ({
  badgeIcon,
  badgeText,
  title,
  description,
  tagline,
  reportCard,
  reverse = false,
}) => {
  return (
    <div
      className={`everything-section-row ${
        reverse ? "lg:grid-flow-dense" : ""
      }`}
    >
      <div className={reverse ? "lg:col-start-2" : ""}>
        <div className="space-y-6">
          <div className="section-badge ">
            {badgeIcon}
            <span>{badgeText}</span>
          </div>
          <h2>{title}</h2>
          <p>{description}</p>
          <div className="section-tag-line">
            <span>
              {tagline}
            </span>
          </div>
          <Button className="learn-more-btn" type="link">
            Learn More
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div className={reverse ? "lg:col-start-1 lg:row-start-1" : ""}>
        {reportCard}
      </div>
    </div>
  );
};
