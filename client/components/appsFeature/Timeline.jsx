/* eslint-disable no-nested-ternary */
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import format from 'date-fns/format';
import isValid from 'date-fns/isValid';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

const TODAY = new Date();

// Determine the color for each step of the timeline
const calcColor = (actObj, isDot = false) => {
  if (actObj.activity === 'Offer Received') {
    return isDot ? 'success' : 'green';
  }
  if (actObj.activity === 'Rejected') {
    return isDot ? 'warning' : 'red';
  }
  if (differenceInCalendarDays(actObj.date, TODAY) >= 0) {
    return isDot ? 'secondary' : 'purple';
  }
  return 'grey';
};

export default function BasicTimeline({ timeline }) {
  // Filter out the milestone date with null value
  const filteredTimeline = timeline.filter((el) => isValid(el.date));
  return (
    <Timeline position="alternate">
      {/* .map to render each step of the filteredTimeline */}
      {filteredTimeline.map((act) => (
        <TimelineItem key={act.activity}>
          <TimelineOppositeContent
            color="text.secondary"
            sx={{ color: calcColor(act) }}
          >
            {format(act.date, 'MM/dd')}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color={calcColor(act, true)} />
            {act.activity === 'Offer Received' ||
            act.activity === 'Rejected' ? null : (
              <TimelineConnector />
            )}
          </TimelineSeparator>
          <TimelineContent sx={{ color: calcColor(act) }}>
            {act.activity}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
