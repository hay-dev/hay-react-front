import {actionTypes} from '../../actions/post';
import update from 'react-addons-update';

const initialState = {
  list: [{
    title: 'AI VUX 기획 입문자를 위한 실전 Tip',
    content: '지난겨울 한창 휴가를 즐기던 중 새로운 프로젝트가 시작되었다는 소식에 마지막 여행코스를 돌지 못하고 급히 복귀하게 되었습니다. 당시 만나게 된 그 새 프로젝트는 음성인식 스피커의 음성 인터페이스를 설계하는 것이었고 필자는 잠시 머릿속이 텅 비는 경험을 했었습니다.',
    summary: '지난겨울 한창 휴가를 즐기던 중 새로운 프로젝트가 시작되었다는 소식에 마지막 여행코스를 돌지 못하고 급히 복귀하게 되었습니다. 당시 만나게 된 그 새 프로젝트는 음성인식 스피커의 음성 인터페이스를 설계하는 것이었고 필자는 잠시 머릿속이 텅 비는 경험을 했었습니다.',
    date: 'Nov.11.2017',
    location: '연남동 심야식다 하스',
    writer: 'writer',
    tags: '#asdasd#asvasv'
  }]
}

function clearText(str){
  return new DOMParser().parseFromString(str, "text/html").getElementsByTagName('body')[0].textContent;
}

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_POST:
      return {
        ...state,
        list : update(
          state.list, {
            [action.id]: {$set: action.obj}
        })
      }
    case actionTypes.UPLOAD_POST:
      return{
        ...state,
        list : [...state.list, {...action.obj, summary: clearText(action.obj.content), comments:[]}]
      }
    default:
      return state
  }
}

export default PostReducer;
