export const actionTypes = {
  UPDATE_POST : "UPDATE_POST",
  UPLOAD_POST : "UPLOAD_POST"
};


export const updatePost = (id, obj) => {
  return {
    type: actionTypes.UPDATE_POST,
    id,
    obj
  }
}


export const uploadPost = (obj) => {
  return {
    type: actionTypes.UPLOAD_POST,
    obj
  }
}
