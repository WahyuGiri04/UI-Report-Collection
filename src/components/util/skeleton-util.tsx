import { Skeleton } from "@/components/ui/skeleton"

type SkeletonMenuProps = {
  count: number;
};

export function SkeletonMenu({ count }: SkeletonMenuProps) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-1">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          key={index}
          className="h-6 group/menu-item relative rounded-md bg-gray-200 mt-2 dark:bg-zinc-800"
        />
      ))}
    </div>
  )
}

export function SkeletonUsers() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-10 w-10 rounded-full bg-gray-200 mt-2 dark:bg-zinc-800" />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <Skeleton className="h-4 w-[150] rounded-md bg-gray-200 mt-2 dark:bg-zinc-800" />
        <Skeleton className="h-4 w-[100] rounded-md bg-gray-200 mt-2 dark:bg-zinc-800" />
      </div>
    </div>
  )
}
