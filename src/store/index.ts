import { legacy_createStore as createStore } from 'redux'

const initialState = {
  lists: [
    {
      name: 'Reduxの学習',
      complete: false,
    },
    {
      name: 'GraphQLの学習',
      complete: false,
    },
    {
      name: 'Reactの学習',
      complete: true,
    },
  ],
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'DONE_LIST':
      return {
        lists: state.lists.map((list) => {
          if (list.name !== action.payload) return list
          return {
            ...list,
            complete: true,
          }
        }),
      }
    case 'DELETE_LIST':
      return {
        lists: state.lists.filter((list) => list.name !== action.payload),
      }
    case 'ADD_LIST':
      return {
        lists: [...state.lists, action.payload],
      }
    default:
      return state
  }
}

const store = createStore(reducer)

export default store
