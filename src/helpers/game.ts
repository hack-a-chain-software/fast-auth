export const getClueStatus = ({
  isStaked,
  isMinted,
  isOwner,
}) => {
  if (isStaked) {
    return 'Revealed';
  }

  if (isMinted) {
    return 'Found';
  }

  return 'Available';
};
