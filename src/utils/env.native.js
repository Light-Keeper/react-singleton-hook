/* eslint-disable import/no-unresolved */
import { unstable_batchedUpdates } from 'react-native';
import { warning } from './warning';

export const batch = cb => unstable_batchedUpdates(cb);
export const mount = C => {
  warning('Can not mount SingletonContainer with react native.'
    + 'Please mount SingletonContainer into your components tree manually.');
};
