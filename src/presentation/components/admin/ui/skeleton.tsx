interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`admin-skeleton rounded-lg ${className}`} />;
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="ml-auto h-5 w-24" />
        </div>
      ))}
    </div>
  );
}
