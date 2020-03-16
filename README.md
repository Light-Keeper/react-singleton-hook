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
##### convert any custom hook into singleton hook

In the code below user profile is not fetched until `useUserProfile` used by some component, 
and once fetched it never reloaded again, the hook remains mounted forever into hidden component. 

```javascript
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

## Documentation
TODO
