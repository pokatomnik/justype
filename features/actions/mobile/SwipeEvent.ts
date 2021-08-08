import type { IActionSubscriber } from '../common/IActionSubscriber';
import type { ISwipeEventParams } from './SwipeEventParams';
import type {
  Direction,
  Axis,
  VerticalDirections,
  HorizontalDirections,
} from './Direction';
import { TouchStart } from './TouchStart';
import { TouchEnd } from './TouchEnd';

export class SwipeEvent implements IActionSubscriber<Direction> {
  private static getChangedTouchPoint(
    evt: globalThis.TouchEvent
  ): Touch | null {
    return evt.changedTouches.item(0) || null;
  }

  private static getAxis(deltaX: number, deltaY: number): Axis {
    if (deltaX > deltaY) {
      return 'horizontal';
    } else if (deltaY > deltaX) {
      return 'vertical';
    } else {
      return 'unknown';
    }
  }

  private getHorizontalDirection(
    startX: number,
    endX: number
  ): HorizontalDirections | null {
    const delta = Math.abs(startX - endX);
    if (delta <= this.params.thresholdX) {
      return null;
    }
    return startX < endX ? 'right' : 'left';
  }

  private getVerticalDirection(
    startY: number,
    endY: number
  ): VerticalDirections | null {
    const delta = Math.abs(startY - endY);
    if (delta <= this.params.thresholdY) {
      return null;
    }
    return startY < endY ? 'bottom' : 'top';
  }

  public constructor(private readonly params: ISwipeEventParams) {}

  public subscribe(subscriber: (evt: Direction) => void) {
    const unsubscribeFromTouchstart = new TouchStart().subscribe(
      (touchStartEvt) => {
        const unsubscribeFromTouchEnd = new TouchEnd().subscribe(
          (touchEndEvt) => {
            unsubscribeFromTouchEnd();
            const startPoint = SwipeEvent.getChangedTouchPoint(touchStartEvt);
            const endPoint = SwipeEvent.getChangedTouchPoint(touchEndEvt);

            if (!startPoint || !endPoint) {
              return;
            }

            const direction = this.getDirection(startPoint, endPoint);

            if (direction !== null) {
              subscriber(direction);
            }
          }
        );
      }
    );

    return () => {
      unsubscribeFromTouchstart();
    };
  }

  private getDirection(touchStart: Touch, touchEnd: Touch): Direction | null {
    const { pageX: startX, pageY: startY } = touchStart;
    const { pageX: endX, pageY: endY } = touchEnd;

    const deltaX = Math.abs(startX - startY);
    const deltaY = Math.abs(startY - endY);

    const axis = SwipeEvent.getAxis(deltaX, deltaY);

    switch (axis) {
      case 'unknown':
        return null;
      case 'horizontal':
        return this.getHorizontalDirection(startX, endX);
      case 'vertical':
        return this.getVerticalDirection(startY, endY);
      default:
        return null;
    }
  }
}
