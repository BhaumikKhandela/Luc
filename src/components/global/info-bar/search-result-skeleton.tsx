import {
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";

export const SearchResultsSkeleton = () => {
  return (
    <>
      {/* Users Skeleton */}
      <CommandGroup heading="Users">
        {[1, 2, 3].map((i) => (
          <CommandItem key={`user-skeleton-${i}`} className="flex gap-3 my-1">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </CommandItem>
        ))}
      </CommandGroup>

      <CommandSeparator />

      {/* Videos Skeleton */}
      <CommandGroup heading="Videos">
        {[1, 2, 3].map((i) => (
          <CommandItem key={`video-skeleton-${i}`} className="my-1">
            <Skeleton className="h-4 w-48" />
          </CommandItem>
        ))}
      </CommandGroup>

      <CommandSeparator />

      {/* Folders Skeleton */}
      <CommandGroup heading="Folders">
        {[1, 2, 3].map((i) => (
          <CommandItem key={`folder-skeleton-${i}`} className="my-1">
            <Skeleton className="h-4 w-40" />
          </CommandItem>
        ))}
      </CommandGroup>
    </>
  );
};
