const activities = [
  'dateSubmitted',
  'onlineAssessment',
  'firstInterview',
  'secondInterview',
  'thirdInterview',
  'offerDate',
  'rejectedDate',
];

export default function createHistoryArray(dates) {
  return activities.map((activity, i) => ({
    activity,
    date: dates[i],
  }));
}
