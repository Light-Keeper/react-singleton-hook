import React, { useEffect, useState } from 'react';
import * as rtl from '@testing-library/react';
import { SingletonHooksContainer, resetLocalStateForTests, addHook } from '../../src/components/SingletonHooksContainer';

describe('SingletonHooksContainer', () => {
  afterEach(() => {
    rtl.cleanup();
    resetLocalStateForTests();
  });

  it('renders', () => {
    rtl.render(<SingletonHooksContainer/>);
  });

  it('mount after automatic mount prints a warning a warning', () => {
    let msg = '';
    const spy = jest.spyOn(console, 'warn').mockImplementation(data => { msg += data; });

    rtl.act(() => {
      addHook({
        initValue: 'hello',
        applyStateChange: (_) => { },
        useHookBody: () => { }
      });
    });

    rtl.render(<div>
      <SingletonHooksContainer/>
    </div>);

    spy.mockRestore();
    expect(msg).toContain('Your SingletonHooksContainer will not be used in favor of internal one.');
  });

  it('adds hooks to mounted container', () => {
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

    expect(hookStates).toEqual(['hello', 'tmp', 'world']);
  });

  it('automatically mounts container into react-dom', () => {
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

    expect(hook1States).toEqual(['a', 'b', 'c']);
    expect(hook2States).toEqual(['1', '2', '3']);
  });
});
