import { shallow } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Node from "../components/Node";
import ConnectedNodes, { Nodes } from "./Nodes";

describe("<Nodes />", () => {
  const actions = {
    checkNodeStatuses: jest.fn(),
  };

  const nodes = {
    list: [
      {
        url: "https://thawing-springs-53971.herokuapp.com",
        online: false,
        name: "Node 1",
        loading: false,
        blocks: {
          loading: false,
          list: [
            {
              index: 1,
              data: "The Human Torch",
            },
            {
              index: 2,
              data: "is denied",
            },
            {
              index: 3,
              data: "a bank loan",
            },
          ],
        },
      },
      {
        url: "https://secret-lowlands-62331.herokuapp.com",
        online: false,
        name: "Node 2",
        loading: false,
      },
    ],
  };

  it("should contain <Node />", () => {
    const wrapper = shallow(<Nodes actions={actions} nodes={nodes} />);

    expect(wrapper.find(Node).length).toEqual(2);
  });

  it("should match snapshot", () => {
    const middlewares = [thunk];
    const store = configureMockStore(middlewares)({ nodes });
    const component = create(
      <Provider store={store}>
        <ConnectedNodes />
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
