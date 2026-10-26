import CompletedDiscoveryGuard from "@/components/common/completedDiscoveryGuard";
import DiscoveryInstruction from "@/components/client/dnaDiscovery/discoveryInstruction";

const Page = () => {
  return (
    <CompletedDiscoveryGuard>
      <DiscoveryInstruction />
    </CompletedDiscoveryGuard>
  );
};

export default Page;
