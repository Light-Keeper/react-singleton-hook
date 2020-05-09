import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import * as rtl from '@testing-library/react';
import { singletonHook } from '../../src';
import { resetLocalStateForTests } from '../../src/components/SingletonHooksContainer';

describe('singletonHook', () => {
  afterEach(() => {
    rtl.cleanup();
    resetLocalStateForTests();
  });

  it('works', () => {
    const useHook = singletonHook({ a: 1 }, () => {
      return { b: 2 };
    });

    let messages = [];
    const Tmp = () => {
      const message = useHook();
      useEffect(() => { messages.push(message); }, [message]);
      return null;
    };

    rtl.render(<Tmp/>);
    expect(messages).toEqual([{ a: 1 }, { b: 2 }]);
  });

  it('does not recalculate the state', () => {
    let counter = 0;
    const useHook = singletonHook(() => counter++, () => {
      return 'xxx';
    });

    let messages = [];
    const Tmp = () => {
      const message = useHook();
      useEffect(() => { messages.push(message); }, [message]);
      return null;
    };

    rtl.render(<div>
      <Tmp/>
      <Tmp/>
    </div>);

    expect(messages).toEqual([0, 0, 'xxx', 'xxx']);
    expect(counter).toEqual(1);
  });

  it('might be initialized with callback', () => {
    let state = 'init state';
    const useHook = singletonHook(() => state, () => {
      return 'state-in-body';
    });

    let messages = [];
    const Tmp = () => {
      const message = useHook();
      useEffect(() => { messages.push(message); }, [message]);
      return null;
    };

    state = 'init state changed before render';
    rtl.render(<Tmp/>);
    expect(messages).toEqual(['init state changed before render', 'state-in-body']);
  });

  it('works when several hooks mounted at the same time', () => {
    const useHook1 = singletonHook({ a: 1 }, () => {
      return useMemo(() => ({ b: 2 }), []);
    });

    const useHook2 = singletonHook({ a: 'x' }, () => {
      return useMemo(() => ({ b: 'y' }), []);
    });

    let messages1 = [];
    let messages2 = [];
    const Tmp = () => {
      const message1 = useHook1();
      const message2 = useHook2();
      useEffect(() => { messages1.push(message1); }, [message1]);
      useEffect(() => { messages2.push(message2); }, [message2]);
      return null;
    };

    rtl.render(<Tmp/>);
    expect(messages1).toEqual([{ a: 1 }, { b: 2 }]);
    expect(messages2).toEqual([{ a: 'x' }, { b: 'y' }]);
  });

  it('works when hook updates itself right after render', () => {
    const useHook = singletonHook('initVal', () => {
      const [state, setState] = useState('initVal');
      useLayoutEffect(() => {
        setState('newVal');
      }, []);
      return state;
    });

    let messages = [];
    const Tmp = () => {
      const message = useHook();
      useEffect(() => { messages.push(message); }, [message]);
      return null;
    };

    rtl.render(<Tmp/>);
    expect(messages).toEqual(['initVal', 'newVal']);
  });
});
