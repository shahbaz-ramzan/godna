"use client";
import ClientDashboardHeader from "@/components/common/clientDashboardHeader/clientDashboardHeader";
import DiscoveryBottomCard from "./discoveryBottomCard";
import FullDiscovery from "./fullDiscovery";
import QuickDiscovery from "./quickDiscovery";

const DnaDiscovery = () => {
  return (
    <>
      <div className="dna-discovery-header">
        <ClientDashboardHeader
          title={`Start Your DNA Discovery`}
          description="Complete your Quick Discovery in minutes and unlock deeper insights with Full Discovery upgrades."
        />
      </div>
      <div className="discovery-row">
        {/* Quick Discovery Card */}
        <QuickDiscovery />
        {/* Full Discovery Card */}
        <FullDiscovery />
      </div>
      {/* What to expect Card */}
      <DiscoveryBottomCard />
    </>
  );
};

export default DnaDiscovery;
