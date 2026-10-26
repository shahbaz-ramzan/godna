import Signup from "@/components/auth/signup";
import { getChargifyProductsDetailsApi } from "@/network/apis/subscription";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const Page = async () => {
  const chargifyProductsDetails = await getChargifyProductsDetailsApi();
  return <Signup chargifyProductsDetails={chargifyProductsDetails?.data} />;
};

export default Page;
