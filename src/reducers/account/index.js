import {actionTypes} from '../../actions/account';

const initialState = {
  profileImg: 'https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?w=640&ssl=1',
  name: '글 못쓰는 소설가',
  email: 'rlatjdfo112@depromet.org',
  description: '소설가이지만 글 못쓰는 소설가 입니다. 글스기를 망성이게하는 착각을 푸는 글을 써보려고 합니다.'
}

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODIFY_INFO:
      let newState = {...state};
        newState[action.attr] = action.value;
      return newState;
    default:
      return state
  }
}

export default AccountReducer;
