"use client";

import { BFMPalette } from "@/Theme";
import { H3, SmallHeading } from "@/Typography";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 8px;
  border: 1px solid ${BFMPalette.white60};
  background-color: ${BFMPalette.white25};
`;

const DatesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const DateBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: 1px solid ${BFMPalette.gray100};
  background-color: ${BFMPalette.white25};
  border-radius: 100px;
  width: 24px;
  height: 24px;
`;

const Deadline = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background-color: ${BFMPalette.red500};
  border-radius: 100px;
  width: 24px;
  height: 24px;
`;

const Border = styled.div`
  border: 4px solid ${BFMPalette.red50};
  border-radius: 100px;
`;

export interface DueDatePayload {
  dueDate: string;
}

interface DueDateProps {
  payload: DueDatePayload;
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getFormattedDateParts = (dueDateString: string) => {
  const parts = dueDateString.split("-");
  if (parts.length !== 3) throw new Error("Invalid due date format");

  const year = parseInt(parts[0], 10);
  const monthIndex = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  if (
    isNaN(year) ||
    isNaN(monthIndex) ||
    isNaN(day) ||
    monthIndex < 0 ||
    monthIndex > 11
  ) {
    throw new Error("Invalid due date values");
  }

  return { year, month: monthNames[monthIndex], day };
};

const generateDates = (dueDateString: string) => {
  const parts = dueDateString.split("-");
  if (parts.length !== 3) throw new Error("Invalid due date format");

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error("Invalid due date values");
  }

  const daysInMonth = [
    31,
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  const dates: { day: number; isDeadline: boolean }[] = [];

  for (let i = -2; i <= 2; i++) {
    let newDay = day + i;
    let newMonth = month;
    let newYear = year;

    if (newDay < 1) {
      newMonth -= 19;
      if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
      }
      newDay = daysInMonth[newMonth - 1] + newDay;
    }

    if (newDay > daysInMonth[newMonth - 1]) {
      newDay -= daysInMonth[newMonth - 1];
      newMonth += 1;
      if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
      }
    }

    dates.push({
      day: newDay,
      isDeadline: i === 0,
    });
  }

  return dates;
};

export default function DueDate({ payload }: DueDateProps) {
  const { year, month } = getFormattedDateParts(payload.dueDate);
  const allDates = generateDates(payload.dueDate);

  return (
    <Container>
      <H3 color={BFMPalette.black800}>
        {month} {year}
      </H3>
      <DatesContainer>
        {allDates.map((date, index) =>
          date.isDeadline ? (
            <Border key={index}>
              <Deadline>
                <SmallHeading color={BFMPalette.white25}>
                  {date.day}
                </SmallHeading>
              </Deadline>
            </Border>
          ) : (
            <DateBox key={index}>
              <SmallHeading>{date.day}</SmallHeading>
            </DateBox>
          )
        )}
      </DatesContainer>
    </Container>
  );
}
