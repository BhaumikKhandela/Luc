"use client"

import { FileWarning, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Period, VideoAnalytics } from "@/types/index.type"

type Props = {
  period: Period
  data: VideoAnalytics | null
}

export const description = "An area chart showing engagement history"


const chartConfig = {
  views: {
    label: "Views",
    color: "#9CA3AF",
  },
  comments: {
    label: "Comments",
    color: "#6B7280",
  },
} satisfies ChartConfig

const formatDateTick = (tick: string, period: Period) => {
  const date = new Date(tick);

  date.setDate(date.getDate() + 1);

  switch (period) {
    case Period.LAST_6_MONTHS:
    case Period.LAST_1_YEAR:
      return date.toLocaleDateString('en-US', { month: 'short' });
    case Period.LIFETIME:
      return date.toLocaleDateString('en-US', { year: 'numeric' });
    default:
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

const EngagementHistory = ({ period, data }: Props) => {
 if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Engagement History</CardTitle>
          <CardDescription>Loading analytics data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full animate-pulse rounded-lg bg-gray-800" />
        </CardContent>
      </Card>
    );
  }

  if (data.status !== 200) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
          <CardDescription>Could not load engagement history.</CardDescription>
        </CardHeader>
        <CardContent className="flex h-[250px] flex-col items-center justify-center gap-4">
          <FileWarning className="h-12 w-12 text-destructive" />
          <p className="text-muted-foreground">{data.data.error || "An unknown error occurred."}</p>
        </CardContent>
      </Card>
    );
  }

  const { analytics: chartData, totalViews, totalComments } = data.data;

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Engagement History</CardTitle>
          <CardDescription>{period}</CardDescription>
        </CardHeader>
        <CardContent className="flex h-[250px] flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">No engagement data available for this period.</p>
        </CardContent>
      </Card>
    );
  }



  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement History</CardTitle>
        <CardDescription>{period}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date" // Use the 'date' field from our data
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => formatDateTick(value, period)} // Use our new formatter
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="views"
              type="natural"
              fill="var(--color-views)"
              fillOpacity={0.4}
              stroke="var(--color-views)"
              stackId="a"
            />
            <Area
              dataKey="comments"
              type="natural"
              fill="var(--color-comments)"
              fillOpacity={0.4}
              stroke="var(--color-comments)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        {/* 6. Display real totals in the footer */}
        <div className="flex w-full items-start gap-x-8 text-sm">
          <div className="grid gap-1">
            <div className="text-muted-foreground">Total Views</div>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
          </div>
          <div className="grid gap-1">
            <div className="text-muted-foreground">Total Comments</div>
            <div className="text-2xl font-bold">{totalComments.toLocaleString()}</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default EngagementHistory;
