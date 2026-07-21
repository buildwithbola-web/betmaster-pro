import React from 'react';
import { CircleDashed, Dribbble } from 'lucide-react';

const RollingFootball = () => (
  <div className="relative w-full h-8 mb-4">
    <div className="absolute inset-x-0 top-1/2 h-[1px] bg-zinc-800/50"></div>
    <div className="animate-rolling-ball absolute top-0">
      <Dribbble className="text-zinc-600 fill-zinc-900" size={24} />
    </div>
  </div>
);

// Fix: Use React.FC to allow standard props like 'key' when rendering in lists
const SkeletonBlock: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`bg-white/5 rounded-none animate-pulse-subtle ${className}`}></div>
);

export const PredictionSkeleton = () => (
  <div className="bg-black rounded-none border border-white/10 p-6 space-y-4">
    <div className="flex items-center gap-4 mb-6">
      <SkeletonBlock className="h-12 w-12 rounded-none" />
      <div className="space-y-2 flex-1">
        <SkeletonBlock className="h-3 w-32" />
        <SkeletonBlock className="h-6 w-48" />
      </div>
    </div>
    <RollingFootball />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {[1, 2].map((i) => (
        <div key={i} className="border border-white/10 rounded-none overflow-hidden">
          <SkeletonBlock className="h-10 w-full rounded-none" />
          <div className="p-4 space-y-6">
            {[1, 2, 3].map((j) => (
              <div key={j} className="space-y-2">
                <div className="flex justify-between">
                  <SkeletonBlock className="h-4 w-24" />
                  <SkeletonBlock className="h-4 w-12" />
                </div>
                <SkeletonBlock className="h-3 w-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const DeepDiveSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {[1, 2].map((i) => (
      <div key={i} className="bg-black rounded-none border border-white/10 p-6 space-y-4">
        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-6 w-full" />
        </div>
        <RollingFootball />
        <SkeletonBlock className="h-16 w-full rounded-none" />
        <SkeletonBlock className="h-24 w-full rounded-none" />
      </div>
    ))}
  </div>
);

export const MicroMarketsSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-white/10 pb-4">
      <SkeletonBlock className="h-8 w-64" />
      <SkeletonBlock className="h-4 w-32" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-black border border-white/10 rounded-none p-5 space-y-4">
          <div className="flex justify-between">
            <SkeletonBlock className="h-10 w-10 rounded-none" />
            <SkeletonBlock className="h-4 w-12" />
          </div>
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-12 w-full rounded-none" />
        </div>
      ))}
    </div>
  </div>
);

export const FirstSetWinnersSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-white/10 pb-4">
      <SkeletonBlock className="h-8 w-64" />
      <SkeletonBlock className="h-4 w-32" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-black border border-white/10 rounded-none p-5 space-y-4">
          <div className="flex justify-between">
            <SkeletonBlock className="h-6 w-32" />
            <SkeletonBlock className="h-10 w-16 rounded-none" />
          </div>
          <SkeletonBlock className="h-16 w-full rounded-none" />
          <SkeletonBlock className="h-12 w-full" />
        </div>
      ))}
    </div>
  </div>
);

export const ScorePredictionsSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-white/10 pb-4">
      <SkeletonBlock className="h-8 w-64" />
      <SkeletonBlock className="h-4 w-32" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-black border border-white/10 rounded-none p-5 space-y-4">
          <SkeletonBlock className="h-6 w-32 mb-4" />
          <SkeletonBlock className="h-24 w-full rounded-none" />
          <SkeletonBlock className="h-16 w-full rounded-none" />
          <SkeletonBlock className="h-16 w-full rounded-none" />
        </div>
      ))}
    </div>
  </div>
);

export const BankerBetsSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-white/10 pb-4">
      <SkeletonBlock className="h-8 w-64" />
      <SkeletonBlock className="h-4 w-32" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-black border border-white/10 rounded-none p-5 space-y-4">
          <SkeletonBlock className="h-4 w-24 mb-2 rounded-none" />
          <SkeletonBlock className="h-6 w-3/4 mb-4" />
          <SkeletonBlock className="h-12 w-full rounded-none" />
          <div className="flex justify-between mt-4">
             <SkeletonBlock className="h-4 w-12" />
             <SkeletonBlock className="h-4 w-12" />
          </div>
          <SkeletonBlock className="h-12 w-full rounded-none" />
        </div>
      ))}
    </div>
  </div>
);