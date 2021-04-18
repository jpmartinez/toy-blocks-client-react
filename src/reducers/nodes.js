import {
  CHECK_NODE_STATUS_FAILURE,
  CHECK_NODE_STATUS_START,
  CHECK_NODE_STATUS_SUCCESS,
  GET_NODE_BLOCKS_FAILURE,
  GET_NODE_BLOCKS_START,
  GET_NODE_BLOCKS_SUCCESS,
} from "../constants/actionTypes";
import initialState from "./initialState";

function updateList(list, node) {
  const nodeIndex = list.findIndex((p) => p.url === node.url);
  if (nodeIndex >= 0) {
    return [
      ...list.slice(0, nodeIndex),
      {
        ...list[nodeIndex],
        ...node,
      },
      ...list.slice(nodeIndex + 1),
    ];
  }
}
export default function nodesReducer(state = initialState().nodes, action) {
  switch (action.type) {
    case CHECK_NODE_STATUS_START:
      return {
        ...state,
        list: updateList(state.list, {
          url: action.node.url,
          loading: true,
        }),
      };

    case CHECK_NODE_STATUS_SUCCESS:
      return {
        ...state,
        list: updateList(state.list, {
          url: action.node.url,
          online: true,
          name: action.res.node_name,
          loading: false,
        }),
      };

    case CHECK_NODE_STATUS_FAILURE:
      return {
        ...state,
        list: updateList(state.list, {
          url: action.node.url,
          online: false,
          loading: false,
        }),
      };
    case GET_NODE_BLOCKS_START:
      return {
        ...state,
        list: updateList(state.list, {
          url: action.node.url,
          blocks: {
            loading: true,
            list: null,
          },
        }),
      };

    case GET_NODE_BLOCKS_SUCCESS:
      return {
        ...state,
        list: updateList(state.list, {
          url: action.node.url,
          blocks: {
            loading: false,
            list: action.res,
          },
        }),
      };

    case GET_NODE_BLOCKS_FAILURE:
      return {
        ...state,
        list: updateList(state.list, {
          url: action.node.url,
          blocks: {
            loading: false,
            list: null,
          },
        }),
      };
    default:
      return state;
  }
}
