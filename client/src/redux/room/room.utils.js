export const checkIfGotDuplicate = (targetRoom, roomList) => {
  for (let i = 0; i < roomList.length; i++) {
    if (targetRoom._id === roomList[i]._id) return roomList;
  }
  return roomList.concat(targetRoom);
};
