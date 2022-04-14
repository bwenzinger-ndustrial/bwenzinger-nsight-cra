export default function(state) {
  if (!state.facilities) return false;
  const facilityState = state.facilities;
  const facilitySlugMap = facilityState.items;
  const selectedSlug = facilityState.selectedSlug;
  return (
    facilitySlugMap &&
    selectedSlug &&
    facilitySlugMap[selectedSlug]?.realTimeEnabled
  );
}
