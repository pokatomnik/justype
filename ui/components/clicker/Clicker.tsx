import * as React from 'react';
import { schedule } from '../../../features';

interface IClickerParams {
  threshold: number;
  clicksToGo: number;
}

interface IClickerProps<T extends HTMLElement> {
  clickHandler: (evt: React.MouseEvent<T>) => void;
  children: (evt: React.MouseEventHandler<T>) => React.ReactNode;
}

export const makeClicker = (params: IClickerParams) => {
  return class Clicker<T extends HTMLElement> extends React.Component<
    IClickerProps<T>
  > {
    private counter = 0;

    private unschedule = () => {};

    private handleClick = (evt: React.MouseEvent<T>) => {
      this.unschedule();
      this.unschedule = schedule(() => {
        this.counter = 0;
      }, params.threshold);

      this.counter++;
      if (this.counter === params.clicksToGo) {
        this.counter = 0;
        this.props.clickHandler(evt);
      }
    };

    public componentWillUnmount() {
      this.unschedule();
    }

    public render() {
      return (
        <React.Fragment>{this.props.children(this.handleClick)}</React.Fragment>
      );
    }
  };
};
