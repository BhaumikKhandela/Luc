"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Period } from "@/types/index.type";


export function SelectPeriod({period, setPeriod}: { period: Period, setPeriod: (period: Period) => void}) {
  return (
    <Select value={period} onValueChange={setPeriod}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={period} />
      </SelectTrigger>
      <SelectContent>
         <SelectGroup>
          <SelectLabel>Activity</SelectLabel>
          <SelectItem value={Period.LAST_24_HOURS}>{Period.LAST_24_HOURS}</SelectItem>
          <SelectItem value={Period.LAST_7_DAYS}>{Period.LAST_7_DAYS}</SelectItem>
          <SelectItem value={Period.LAST_30_DAYS}>{Period.LAST_30_DAYS}</SelectItem>
          <SelectItem value={Period.LAST_6_MONTHS}>{Period.LAST_6_MONTHS}</SelectItem>
          <SelectItem value={Period.LAST_1_YEAR}>{Period.LAST_1_YEAR}</SelectItem>
          <SelectItem value={Period.LIFETIME}>{Period.LIFETIME}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
