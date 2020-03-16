import React, { useEffect, useLayoutEffect, useState } from 'react';
import * as rtl from '@testing-library/react-native';
import { singletonHook, SingletonHooksContainer } from '../../src';
import { resetLocalStateForTests } from '../../src/components/SingletonHooksContainer';

describe('singletonHook', () => {
  afterEach(() => {
    rtl.cleanup();
    resetLocalStateForTests();
  });

  it('asks to manually mount SingletonHooksContainer', () => {
    let message = '';
    const spy = jest.spyOn(console, 'warn').mockImplementation((data) => { message += data; });
    const useHook = singletonHook(0, () => 1);
    const Tmp = () => {
      useHook();
      return null;
    };

    rtl.render(<Tmp/>);

    spy.mockRestore();
    expect(message).toContain('');
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

    rtl.render(
      <>
        <SingletonHooksContainer/>
        <Tmp/>
      </>
    );
    expect(messages).toEqual([{ a: 1 }, { b: 2 }]);
  });

  it('works when several hooks mounted at the same time', () => {
    const useHook1 = singletonHook({ a: 1 }, () => {
      return { b: 2 };
    });

    const useHook2 = singletonHook({ a: 'x' }, () => {
      return { b: 'y' };
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

    rtl.render(
      <>
        <SingletonHooksContainer/>
        <Tmp/>
      </>
    );

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

    rtl.render(
      <>
        <SingletonHooksContainer/>
        <Tmp/>
      </>
    );

    expect(messages).toEqual(['initVal', 'newVal']);
  });
});
