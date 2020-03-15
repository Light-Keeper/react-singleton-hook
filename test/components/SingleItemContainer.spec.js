import React from 'react';
import * as rtl from '@testing-library/react';
import { SingleItemContainer } from '../../src/components/SingleItemContainer';

describe('SingleItemContainer', () => {
  afterEach(() => rtl.cleanup());

  it('calls body', () => {
    let called = false;
    let lastVal = null;
    const useContextBody = () => {
      called = true;
      return 'hello';
    };

    const applyChange = (val) => { lastVal = val; };
    rtl.render(<SingleItemContainer initValue="foo" applyStateChange={applyChange} useHookBody={useContextBody}/>);

    expect(lastVal).toEqual('hello');
    expect(called).toEqual(true);
  });
});
