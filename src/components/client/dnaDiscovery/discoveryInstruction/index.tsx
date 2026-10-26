import RadioBtnIcon from "@/components/icons/radioBtnIcon";
import { CheckCircleFilled } from "@ant-design/icons";
import { Steps } from "antd";
import BeginButton from "./beginButton";

const DiscoveryInstruction = () => {
  return (
    <section className="discovery-instruction-wrapper">
      <div className="di-card">
        <Steps
          className="di-steps"
          titlePlacement="vertical"
          current={1}
          items={[
            {
              title: "Instructions",
              icon: <CheckCircleFilled />,
            },
            {
              title: "Discover Your DNA",
              icon: <RadioBtnIcon />,
            },
          ]}
        />

        <div className="di-content bg-white max-w-[650px] mx-auto rounded-[0.875rem] p-[32px] mb-5 flex flex-col items-center !text-left">
          <h2 className="text-2xl !font-semibold !mb-4">
            Discovery Process Instructions
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-[14px]">
            <li>There are 3 possible answers for each question.</li>
            <li>
              Select what <strong>MOST</strong> and <strong>LEAST</strong>{" "}
              applies to you.
            </li>
            <li>Leave the third option unchecked.</li>
            <li>For the best results, go with your first instinct.</li>
          </ul>
        </div>
        <BeginButton />
      </div>
    </section>
  );
};

export default DiscoveryInstruction;
