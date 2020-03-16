React Singleton Hook
==========================

Manage global state of your React app using hooks. 

[![build status](https://img.shields.io/travis/Light-Keeper/react-singleton-hook/master.svg?style=flat-square)](https://travis-ci.org/Light-Keeper/react-singleton-hook) 
[![npm version](https://img.shields.io/npm/v/react-singleton-hook.svg?style=flat-square)](https://www.npmjs.com/package/react-singleton-hook)
[![npm downloads](https://img.shields.io/npm/dm/react-singleton-hook.svg?style=flat-square)](https://www.npmjs.com/package/react-singleton-hook)

## Installation

To use React Singleton Hook with your React app, install it as a dependency:

```bash
# If you use npm:
npm install react-singleton-hook

# Or if you use Yarn:
yarn add react-singleton-hook
```

This assumes that you’re using [npm](http://npmjs.com/) package manager 
with a module bundler like [Webpack](https://webpack.js.org/) or 
[Browserify](http://browserify.org/) to consume [CommonJS 
modules](https://webpack.js.org/api/module-methods/#commonjs).


## Examples
#### convert any custom hook into singleton hook

In the code below, the user profile is not fetched until `useUserProfile` used by some component, 
and once fetched it is never reloaded again, the hook remains mounted forever into hidden component. 

```javascript
import  { useEffect, useState } from 'react';
import { singletonHook } from 'react-singleton-hook';
const api = { async getMe() { return { name: 'test' }; } };

const init = { loading: true };

const useUserProfileImpl = () => {
  const [profile, setProfile] = useState(init);
  useEffect(() => {
    api.getMe()
      .then(profile => setProfile({ profile }))
      .catch(error => setProfile({ error }));
  }, []);

  return profile;
};

export const useUserProfile = singletonHook(init, useSessionImpl);
```

#### dark/light mode switch 
Whenever `Configurator` changes darkMode, all subscribed components are updated.

```javascript
/***************    file:src/services/darkMode.js    ***************/  
import { useState } from 'react';
import { singletonHook } from 'react-singleton-hook';

const initDarkMode = false;
let globalSetMode = () => { throw new Error('you must useDarkMode before setting its state'); };

export const useDarkMode = singletonHook(initDarkMode, () => {
  const [mode, setMode] = useState(initDarkMode);
  globalSetMode = setMode;
  return mode;
});

export const setDarkMode = mode => globalSetMode(mode);


/***************    file:src/compoents/App.js    ***************/

import  React from 'react';
import { useDarkMode, setDarkMode } from 'src/services/darkMode';

const Consumer1 = () => {
  const mode = useDarkMode();
  return <div className={`is-dark-${mode}`}>Consumer1 - {`${mode}`}</div>;
};

const Consumer2 = () => {
  const mode = useDarkMode();
  return <div className={`is-dark-${mode}`}>Consumer2 - {`${mode}`}</div>;
};

const Configurator = () => {
  const mode = useDarkMode();
  return <button onClick={() => setDarkMode(!mode)}>Toggle dark/light</button>;
};

```

### imperatively read hook state for non-react code
```javascript
import { useState } from 'react';
import { singletonHook } from 'react-singleton-hook';

const initDarkMode = false;
let currentMode = initDarkMode;
let globalSetMode = () => { throw new Error(`you must useDarkMode before setting its state`); };

export const useDarkMode = singletonHook(initDarkMode, () => {
  const [mode, setMode] = useState(initDarkMode);
  globalSetMode = setMode;
  currentMode = mode;
  return mode;
});

export const setDarkMode = mode => globalSetMode(mode);
export const getDarkMode = () => currentMode;
```

### use react-redux (or any other context) inside singletonHook
To use react-redux or any other context-based functionality, singleton hooks should be mounted under provider in your app.
To do that, import `SingletonHooksContainer` from `react-singleton-hook` and mount anywhere in you app. 
**SingletonHooksContainer must be rendered ealier then any component using singleton hook!**
By default you are not required to dial with a `SingletonHooksContainer`, we run this component internally in separate react app.


```javascript
/***************    file:src/services/currentUser.js    ***************/
import { singletonHook } from 'react-singleton-hook';
import { useSelector } from 'react-redux';

const init = { loading: true };
const useCurrentUserImpl = () => {
  const session = useSelector(state => state.session);
  if (session.loading) return init;
  return session.user;
};

export const useCurrentUser = singletonHook(init, useCurrentUserImpl);

/***************    file:src/App.js    ***************/

import React from 'react';
import ReactDOM from 'react-dom';
import { SingletonHooksContainer } from 'react-singleton-hook';
import { Provider } from 'react-redux';
import store from 'src/store';
import App from 'src/views';

const app = (
  <Provider store={store}>
    <>
      <SingletonHooksContainer/>
      <App/>
    </>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
```

### top-level components updated before low-level components

```javascript
/***************    file:src/services/session.js    ***************/

import { useEffect, useState } from 'react';
import { singletonHook } from 'react-singleton-hook';

const initState = { loading: true };
let setSessionGlobal = () => { throw new Error('you must useSession before login'); };

const useSessionImpl = () => {
  const [session, setSession] = useState(initState);
  setSessionGlobal = setSession;
  useEffect(() => { setSession({ loggedIn: false }); }, []);
  return session;
};

export const useSession = singletonHook(initState, useSessionImpl);

export const login = (name, pass) => {
  setSessionGlobal({ loggedIn: true, user: { name: 'test' } });
};

/***************    file:src/index.js    ***************/
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { login, useSession } from 'src/services/session';

const LoggedInView = () => {
  const session = useSession();
  console.log(`LoggerInView rendered with ${JSON.stringify(session)}`);
  return null;
};

const LoggedOutView = () => {
  const session = useSession();
  console.log(`LoggedOutView rendered with ${JSON.stringify(session)}`);
  return null;
};

const WaitingForSessionView = () => {
  const session = useSession();
  console.log(`WaitingForSessionView rendered with ${JSON.stringify(session)}`);
  return null;
};

const MainComponent = () => {
  const session = useSession();

  useEffect(() => {
    setTimeout(() => { login('testuser'); }, 2000);
  }, []);

  console.log(`MainComponent rendered with ${JSON.stringify(session)}`);

  if (session.loading) return <WaitingForSessionView/>;
  if (session.loggedIn) return <LoggedInView/>;
  return <LoggedOutView/>;
};


ReactDOM.render(<MainComponent/>, document.getElementById('root'));

/***************    console.log    ***************/
/*

MainComponent rendered with {"loading":true}
WaitingForSessionView rendered with {"loading":true}
MainComponent rendered with {"loggedIn":false}
LoggedOutView rendered with {"loggedIn":false}
MainComponent rendered with {"loggedIn":true,"user":{"name":"test"}}
LoggerInView rendered with {"loggedIn":true,"user":{"name":"test"}}

*/
```


## React Native
To use this library with react-native you always have to mount `SingletonHooksContainer` manually. 
See how to do it in example: *use react-redux (or any other context) inside singletonHook*

## Server Side Rendering
Singleton hooks are ignored during SSR and always return initial value.  
