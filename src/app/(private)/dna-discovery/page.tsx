import CompletedDiscoveryGuard from "@/components/common/completedDiscoveryGuard";
import DnaDiscovery from "@/components/client/dnaDiscovery";

const Page = () => {
  return (
    <CompletedDiscoveryGuard>
      <DnaDiscovery />
    </CompletedDiscoveryGuard>
  );
};

export default Page;
