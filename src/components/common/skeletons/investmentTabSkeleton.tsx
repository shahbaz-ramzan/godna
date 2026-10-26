export const InvestmentTabSkeleton = () => {
  return (
    <div className="investment-card-wrapper glass-card p-8 space-y-6">
      {/* Skeleton for investment card list */}
      <div className="investment-card-list space-y-4">
        {/* Skeleton for Recommended Investment Mix heading */}
        <div className="h-6 w-56 bg-slate-200 rounded"></div>

        {/* Skeleton for list items */}
        <div className="investment-card-list-wrapper space-y-3">
          {['skeleton-investment-0', 'skeleton-investment-1', 'skeleton-investment-2', 'skeleton-investment-3', 'skeleton-investment-4'].map((skeletonId) => (
            <div
              key={skeletonId}
              className="investment-card-list-item glass-card flex items-center justify-between p-4"
            >
              <div className="h-5 w-32 bg-slate-200 rounded"></div>
              <div className="h-6 w-12 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
