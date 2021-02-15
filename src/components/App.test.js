import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  // describe('render()', () => {
  //   it('renders the Grid', () => {
  //     expect(wrapper.find('app')).toHaveLength(1);
  //   });
  // });
});
