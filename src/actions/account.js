export const actionTypes = {
  MODIFY_INFO : "MODIFY_INFO"
};

export const setAccountInfo = (attr, value) => {
  return {
    type: actionTypes.MODIFY_INFO,
    attr,
    value
  }
}
