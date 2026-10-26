import DiscoveryGuard from "@/components/common/discoveryGuard";
import Report from "@/components/client/report/index";

const Page = () => {
  return (
    <DiscoveryGuard>
      <Report />
    </DiscoveryGuard>
  );
};

export default Page;
