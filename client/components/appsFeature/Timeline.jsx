import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

import format from 'date-fns/format';
import isValid from 'date-fns/isValid';

export default function BasicTimeline({ timeline }) {
  const filteredTimeline = timeline.filter((el) => isValid(el));

  return (
    <Timeline>
      {filteredTimeline.map((activity) => (
        <TimelineItem key={activity.toString()}>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>{format(activity, 'MM/dd')}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
