import { Suspense } from "react";
import { ParticipantBusinessReport } from "@/components/client/participantBusinessReport";

export default function ParticipantBusinessReportPage() {
  return (
    <Suspense fallback={null}>
      <ParticipantBusinessReport />
    </Suspense>
  );
}
