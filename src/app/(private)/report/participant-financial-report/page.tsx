import { Suspense } from "react";
import { FinancialBusinessReport } from "@/components/client/participantfinancialReport";

export default function ParticipantFinancialReportPage() {
  return (
    <Suspense fallback={null}>
      <FinancialBusinessReport />
    </Suspense>
  );
}

