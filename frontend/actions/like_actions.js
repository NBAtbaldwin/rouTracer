import * as ApiUtil from './../util/like_util';
export const RECEIVE_LIKE = 'RECEIVE_LIKE';
// export const RECEIVE_LIKES = 'RECEIVE_LIKES';
export const DELETE_LIKE = 'DELETE_LIKE';

export const receiveLike = (like) => ({
  type: RECEIVE_LIKE,
  like: like
});

export const removeLike = (likeId) => ({
  type: DELETE_LIKE,
  likeId: likeId
});

export const fetchLike = id => dispatch => (
  ApiUtil.getLike(id).then((like) => (dispatch(receiveLike(like))
  ))
);

export const createLike = like => dispatch => (
  ApiUtil.createLike(like).then((like) => (dispatch(receiveLike(like))))
);

export const deleteLike = id => dispatch => (
  ApiUtil.deleteLike(id).then((like) => (dispatch(removeLike(id))))
);
