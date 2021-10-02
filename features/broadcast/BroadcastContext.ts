import * as React from 'react';
import { Broadcast } from './Broadcast';

export const BroadcastContext = React.createContext<Broadcast | null>(null);
