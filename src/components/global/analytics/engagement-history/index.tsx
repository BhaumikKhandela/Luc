"use client"

import { TrendingUp } from "lucide-react"
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
import { Period } from "@/types/index.type"

type Props = {
  period: Period
  data?: { label: string; views: number; comments: number }[]
}

export const description = "An area chart showing engagement history"

// Placeholder data - will be replaced with real data from props
const defaultChartData = [
  { label: "Jan", views: 186, comments: 80 },
  { label: "Feb", views: 305, comments: 120 },
  { label: "Mar", views: 237, comments: 95 },
  { label: "Apr", views: 73, comments: 40 },
  { label: "May", views: 209, comments: 85 },
  { label: "Jun", views: 214, comments: 90 },
]

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

const getPeriodDescription = (period: Period): string => {
  const now = new Date();
  let fromDate: Date;
  
  switch (period) {
    case Period.LAST_24_HOURS:
      fromDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case Period.LAST_7_DAYS:
      fromDate = new Date(now);
      fromDate.setDate(fromDate.getDate() - 7);
      break;
    case Period.LAST_30_DAYS:
      fromDate = new Date(now);
      fromDate.setDate(fromDate.getDate() - 30);
      break;
    case Period.LAST_6_MONTHS:
      fromDate = new Date(now);
      fromDate.setMonth(fromDate.getMonth() - 6);
      break;
    case Period.LAST_1_YEAR:
      fromDate = new Date(now);
      fromDate.setFullYear(fromDate.getFullYear() - 1);
      break;
    case Period.LIFETIME:
      return "All time";
    default:
      return "All time";
  }
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };
  
  return `${formatDate(fromDate)} - ${formatDate(now)}`;
};

const EngagementHistory = ({ period, data }: Props) => {
  const chartData = data || defaultChartData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement History</CardTitle>
        <CardDescription>{getPeriodDescription(period)}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
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
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this period <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {getPeriodDescription(period)}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default EngagementHistory;
