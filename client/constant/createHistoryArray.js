const activities = [
  'dateSubmitted',
  'onlineAssessment',
  'firstInterview',
  'secondInterview',
  'thirdInterview',
  'offerDate',
  'rejectedDate',
];

const timelineActivities = [
  'Date Submitted',
  'Online Assessment',
  '1st Interview',
  '2nd Interview',
  '3rd Interview',
  'Offer Received',
  'Rejected',
];

export default function createHistoryArray(dates) {
  return activities.map((activity, i) => ({
    activity,
    date: dates[i],
  }));
}

export function createTimelineArray(dates) {
  return timelineActivities.map((activity, i) => ({
    activity,
    date: dates[i],
  }));
}
