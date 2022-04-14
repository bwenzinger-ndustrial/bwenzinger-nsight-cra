# nsight-portfolio-dashboard CHANGELOG

## v2.0.1 (2021-05-26)

## v2.0.0 (2021-05-26)

Added:

- KPI Cards and charts have been combined into one block, and no longer display as a row at the top of the dashboard view.
- Adds new Portfolio Detail page which allows users to compare KPIs by date range, and see a more specific view of the data which shows:
  - A detail chart which updates based on the users selection of date ranges
  - A breakdown table, which lists every facility belonging to an organization, and aggregated values for the select KPI
  - Facilities are all links to their corresponding Facility Overview page

Changed:

- Budget has been converted from a sidebar to a KPI with a bar chart comparing monthly budget and spend data
- Some selectors and reducers were moved to the @ndustrial/nsight-common package

## v1.1.0 (2021-04-02)

Added:

- KPI Cards are now at the top of the Dashboard page ([APPS-1959](https://ndustrialio.atlassian.net/browse/APPS-1959))
- A Portfolio Detail page has been added ([APPS-964](https://ndustrialio.atlassian.net/browse/APPS-964))

## v1.0.1 (2021-04-02)

Fix:

- Fixed versions in package.json that were pinned to unavailable versions

## v1.0.0 (2021-04-02)

- This is the initial release of the Portfolio Dashboard project
