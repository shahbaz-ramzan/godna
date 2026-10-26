
export const SummaryCardSkeleton = () => {
  return (
    <div className="dashboard-report-card dna-gradient-soft glass-card">
      <div className="dashboard-card-content">
        <div className="dashboard-card-content-left space-y-2">
          {/* Caption Skeleton - placeholder for <p className="dashboard-card-caption"> */}
          <div className="h-4 w-3/5 bg-slate-400 rounded-md"></div>

          {/* Title Skeleton - placeholder for <h2 className="text-primary"> */}
          <div className="h-6 w-2/5 bg-slate-500 rounded-md"></div>

          {/* Description Skeleton - placeholder for <p className="dashboard-card-description"> */}
          <div className="h-4 w-full bg-slate-400 rounded-md"></div>
          <div className="h-4 w-4/5 bg-slate-400 rounded-md"></div>
          <div className="h-4 w-3/5 bg-slate-400 rounded-md"></div>
        </div>

        {/* Button Skeleton - placeholder for <button> */}
        <div className="h-9 w-40 bg-gray-300 rounded-2xl"></div>
      </div>
    </div>
  );
};
