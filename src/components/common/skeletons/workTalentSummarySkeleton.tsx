const SKELETON_TASK_IDS = [
  'skeleton-task-0',
  'skeleton-task-1',
  'skeleton-task-2',
  'skeleton-task-3',
  'skeleton-task-4',
  'skeleton-task-5',
  'skeleton-task-6',
  'skeleton-task-7',
  'skeleton-task-8',
  'skeleton-task-9',
];

export const WorkTalentSummarySkeleton = () => {
  return (
    <div className="work-talent-summary-wrapper">
      {/* Skeleton for summary card */}
      <div className="work-talent-summary-card glass-card dna-gradient-soft">
        <div className="summary-card-content">
          <div className="summary-card-content-header">
            <div className="card-header-left">
              <div className="h-4 w-48 bg-slate-200 rounded mb-2"></div>
              <div className="h-5 w-64 bg-slate-200 rounded my-2"></div>
              <div className="h-4 w-56 bg-slate-200 rounded"></div>
            </div>
            <div className="h-6 w-24 bg-slate-200 rounded-md"></div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="h-4 w-full bg-slate-200 rounded"></div>
            <div className="h-4 w-full bg-slate-200 rounded"></div>
            <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
      {/* Skeleton for desired tasks card */}
      <div className="summary-desired-tasks-card glass-card">
        <div className="h-5 w-32 bg-slate-200 rounded"></div>
        <div className="h-4 w-full bg-slate-200 rounded my-6"></div>
        <div className="desired-tasks-list grid grid-cols-1 md:grid-cols-2 gap-3">
          {SKELETON_TASK_IDS.map((id) => (
            <div key={id} className="desired-tasks-item">
              <div className="h-4 w-40 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
