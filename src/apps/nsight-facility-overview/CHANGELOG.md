# nsight-facility-overview CHANGELOG

## v2.0.1 (2021-05-26)

## v2.0.0 (2021-05-26)

Added:

- Budget KPI dashboard and detail. It only uses one date range picker, and compares two different metrics.
- Daily kWh view added to facility dashboard

Changed:

- Utility bill and real time components consolidated.
- Legends for facility details charts were moved to the bottom of the chart.
- Labels with dates below facility detail chart heading removed.
- Metric service updated to use EMS to proxy SIS and Assets services

Fixed:

- Chart minimum values no longer go below the chart container, where they were hidden.
- Breakdown chart points are better synchronized with main chart when hovering over data points

## v1.0.2 (2021-04-02)

Changed:

- Some code was moved to @ndustrial/nsight-common in preparation for the upcoming Portfolio Detail changes in @ndustrial/nsight-portfolio-dashboard

Fixed:

- Facility Detail Breakdown Graphs: The % change was fixed to show the correct number ([APPS-2001](https://ndustrialio.atlassian.net/browse/APPS-2001))

## v1.0.1 (2021-04-02)

Fix:

- Fixed versions in package.json that were pinned to unavailable versions

## v1.0.0 (2021-04-02)

- This is the initial release of the Facility Overview project
