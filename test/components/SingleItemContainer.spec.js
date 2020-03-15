import React from 'react';
import * as rtl from '@testing-library/react';
import { SingleItemContainer } from '../../src/components/SingleItemContainer';

describe('SingleItemContainer', () => {
  afterEach(() => rtl.cleanup());

  it('calls body', () => {
    let called = false;
    let lastVal = 'foo';
    let updateCount = 0;
    const useContextBody = () => {
      called = true;
      return 'hello';
    };

    const applyChange = (val) => { lastVal = val; updateCount++; };
    rtl.render(<SingleItemContainer initValue={lastVal} applyStateChange={applyChange} useHookBody={useContextBody}/>);

    expect(lastVal).toEqual('hello');
    expect(called).toEqual(true);
    expect(updateCount).toEqual(1);
  });

  it('reports invalid hook format', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => rtl.render(<SingleItemContainer initValue="foo" applyStateChange={() => {}} useHookBody={{}}/>)).toThrow('function expected');
    spy.mockRestore();
  });

  it('does not update if state did not change', () => {
    let updateCount = 0;
    let initState = { a: 1 };
    const useContextBody = () => initState;

    const applyChange = () => { updateCount++; };
    rtl.render(<SingleItemContainer initValue={initState} applyStateChange={applyChange} useHookBody={useContextBody}/>);

    expect(updateCount).toEqual(0);
  });
});
