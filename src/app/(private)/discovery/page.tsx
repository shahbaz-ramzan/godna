import CompletedDiscoveryGuard from "@/components/common/completedDiscoveryGuard";
import Discovery from "@/components/client/dnaDiscovery/discovery";

const Page = () => {
  return (
    <CompletedDiscoveryGuard>
      <Discovery />
    </CompletedDiscoveryGuard>
  );
};

export default Page;
