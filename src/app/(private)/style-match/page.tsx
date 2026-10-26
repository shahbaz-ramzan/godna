import DiscoveryGuard from "@/components/common/discoveryGuard";
import StyleMatch from "@/components/client/styleMatch";

const Page = () => {
  return (
    <DiscoveryGuard>
      <StyleMatch />
    </DiscoveryGuard>
  );
};

export default Page;
