import 'babel-polyfill';
import React, { useEffect, useState } from 'react';
import * as rtl from '@testing-library/react';
import { SingletonHooksContainer, resetLocalStateForTests, addHook } from '../../src/components/SingletonHooksContainer';

describe('SingletonHooksContainer', () => {
  afterEach(() => {
    rtl.cleanup();
    resetLocalStateForTests();
  });

  it('renders', async () => {
    rtl.render(<SingletonHooksContainer/>);
    await rtl.act(() => Promise.resolve());
  });

  it('second mount prints a warning', async () => {
    let msg = '';
    const spy = jest.spyOn(console, 'warn').mockImplementation(data => { msg += data; });
    rtl.render(<div>
      <SingletonHooksContainer/>
      <SingletonHooksContainer/>
    </div>);

    await rtl.act(() => Promise.resolve());
    spy.mockRestore();
    expect(msg).toContain('SingletonHooksContainer is mounted second time');
  });

  it('adds hooks to mounted container', async () => {
    let hookStates = ['hello'];

    rtl.render(<SingletonHooksContainer/>);

    rtl.act(() => {
      addHook({
        initValue: 'hello',
        applyStateChange: (val) => { hookStates.push(val); },
        useHookBody: () => {
          const [state, setState] = useState('tmp');
          useEffect(() => {
            setState('world');
          }, []);
          return state;
        }
      });
    });

    await rtl.act(() => Promise.resolve());
    expect(hookStates).toEqual(['hello', 'tmp', 'world']);
  });

  it('automatically mounts container into react-dom', async () => {
    let hook1States = ['a'];
    let hook2States = ['1'];
    rtl.act(() => {
      addHook({
        initValue: 'hello',
        applyStateChange: (val) => { hook1States.push(val); },
        useHookBody: () => {
          const [state, setState] = useState('b');
          useEffect(() => {
            setState('c');
          }, []);
          return state;
        }
      });

      addHook({
        initValue: 'hello',
        applyStateChange: (val) => { hook2States.push(val); },
        useHookBody: () => {
          const [state, setState] = useState('2');
          useEffect(() => {
            setState('3');
          }, []);
          return state;
        }
      });
    });

    await rtl.act(() => Promise.resolve());
    expect(hook1States).toEqual(['a', 'b', 'c']);
    expect(hook2States).toEqual(['1', '2', '3']);
  });
});
