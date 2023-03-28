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

export default function BasicTimeline({ timeline }) {
  const filteredTimeline = timeline.filter((el) => isValid(el.date));
  return (
    <Timeline position="alternate">
      {filteredTimeline.map((act) => (
        <TimelineItem key={act.activity}>
          <TimelineOppositeContent
            color="text.secondary"
            sx={
              act.activity === 'Offer Received'
                ? { color: 'green' }
                : act.activity === 'Rejected'
                ? { color: 'red' }
                : {}
            }
          >
            {format(act.date, 'MM/dd')}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot
              color={
                act.activity === 'Offer Received'
                  ? 'success'
                  : act.activity === 'Rejected'
                  ? 'warning'
                  : 'grey'
              }
            />
            {act.activity === 'Offer Received' ||
            act.activity === 'Rejected' ? null : (
              <TimelineConnector />
            )}
          </TimelineSeparator>
          <TimelineContent
            sx={
              act.activity === 'Offer Received'
                ? { color: 'green' }
                : act.activity === 'Rejected'
                ? { color: 'red' }
                : {}
            }
          >
            {act.activity}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
