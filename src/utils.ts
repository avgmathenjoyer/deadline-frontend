import { format } from "date-fns";

export enum TimeScale {
    FINISHED = 0,
    DAY = 1,
    THREE_DAYS = 2,
    WEEK = 3,
    MONTH = 4,
    YEAR = 5,
    LONGER_THAN_YEAR = 6,
}

export const TIME_SCALE_ARRAY: TimeScale[] = [
    TimeScale.FINISHED,
    TimeScale.DAY,
    TimeScale.THREE_DAYS,
    TimeScale.WEEK,
    TimeScale.MONTH,
    TimeScale.YEAR,
    TimeScale.LONGER_THAN_YEAR,
];

export type Deadline = {
    id: number;
    title: string;
    description: string;
    endDate: Date;
};

export const TIME_AMOUNT_TO_MILLISECONDS = {
    [TimeScale.FINISHED]: -1,
    [TimeScale.DAY]: 86400000,
    [TimeScale.THREE_DAYS]: 259200000,
    [TimeScale.WEEK]: 604800000,
    [TimeScale.MONTH]: 2629746000,
    [TimeScale.YEAR]: 31556952000,
    [TimeScale.LONGER_THAN_YEAR]: 31556952001,
};

export const TIME_SCALE_TO_MESSAGE = {
    [TimeScale.FINISHED]: "Finished deadlines",
    [TimeScale.DAY]: "Day until completion",
    [TimeScale.THREE_DAYS]: "3 days until completion",
    [TimeScale.WEEK]: "Week until completion",
    [TimeScale.MONTH]: "Month until completion",
    [TimeScale.YEAR]: "Year until completion",
    [TimeScale.LONGER_THAN_YEAR]: "More than one year to completion",
};

export const EMPTY_TIME_SCALE_DEADLINE_MAPPING: { [scale in TimeScale]: Deadline[] } = {
    [TimeScale.FINISHED]: [],
    [TimeScale.DAY]: [],
    [TimeScale.THREE_DAYS]: [],
    [TimeScale.WEEK]: [],
    [TimeScale.MONTH]: [],
    [TimeScale.YEAR]: [],
    [TimeScale.LONGER_THAN_YEAR]: [],
};

export function calculateTimeScale(endDate: Date): TimeScale {
    const currentDate: Date = new Date();
    const howMuchTimeLeft: number = endDate.getTime() - currentDate.getTime();
    const possibleTimeScales: TimeScale[] = [
      TimeScale.FINISHED,
      TimeScale.THREE_DAYS,
      TimeScale.WEEK,
      TimeScale.MONTH,
      TimeScale.YEAR,
    ];
    if (howMuchTimeLeft <= 0) {
      return TimeScale.FINISHED;
    }
    for (const timeScale of possibleTimeScales) {
      if (howMuchTimeLeft < TIME_AMOUNT_TO_MILLISECONDS[timeScale]) {
        return timeScale;
      }
    }
    return TimeScale.LONGER_THAN_YEAR;
}

export function processDateForSending(date: Date) {
  let monthComponent: string;
  let dayComponent: string;

  if (date.getMonth() + 1 < 10) {
    monthComponent = "0" + (date.getMonth() + 1).toString();
  }
  else {
    monthComponent = (date.getMonth() + 1).toString();
  }

  if (date.getDate() < 10) {
    dayComponent = "0" + (date.getDate()).toString();
  }
  else {
    dayComponent = (date.getDate()).toString();
  }

  return `${date.getFullYear()}-${monthComponent}-${dayComponent}`;
}

export function formatDateForShowing(date: Date) {
  return format(date, "EEEE, do 'of' LLLL, y")
}


export function generateTimeScaleMapping(deadlines: Deadline[]) {
  const mapping = structuredClone(EMPTY_TIME_SCALE_DEADLINE_MAPPING);
  for (const deadline of deadlines) {
    const calculatedTimeScale = calculateTimeScale(deadline.endDate);
    mapping[calculatedTimeScale].push(deadline)
  }
  return mapping;
}