import slug from 'slug';

function mergeSeasons(energySeasons, demandSeasons) {
  const seasons = {};

  energySeasons.forEach((season) => {
    if (!seasons[season.seasonName]) {
      seasons[season.seasonName] = {
        seasonName: season.seasonName,
        slug: slug(season.seasonName).toLowerCase()
      };
    }

    seasons[season.seasonName].energySeason = season;
  });
  demandSeasons.forEach((season) => {
    // TODO: display flat demand season types in another format
    if (season.seasonType === 'flat') {
      return;
    }

    if (!seasons[season.seasonName]) {
      seasons[season.seasonName] = {
        seasonName: season.seasonName,
        slug: slug(season.seasonName).toLowerCase()
      };
    }

    seasons[season.seasonName].demandSeason = season;
  });

  return (
    Object.keys(seasons)
      // sort alphabetically
      .sort((a, b) => {
        if (b > a) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      })
      .map((season) => seasons[season])
  );
}

export default mergeSeasons;
