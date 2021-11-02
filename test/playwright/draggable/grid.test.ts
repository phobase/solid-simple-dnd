import { expect, test } from '@playwright/test';
import { getStorybookUrl, gridSize } from '../../storybook/constant';
import { drag } from './drag';
import { draggableTestId, targetTestId } from './constant';

test.describe('given I have Draggable in grid', () => {
  test('then it should move in grid only', async ({ page }) => {
    await page.goto(getStorybookUrl('draggable-grid'));

    const draggable = await page.waitForSelector(draggableTestId);
    const target = await page.waitForSelector(targetTestId);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const targetRect = (await target.boundingBox())!;

    await drag(page, draggable, target);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newDraggableRect = (await draggable.boundingBox())!;

    expect(newDraggableRect.x).not.toEqual(targetRect.x);
    expect(newDraggableRect.y).not.toEqual(targetRect.y);
    expect(newDraggableRect.x).toEqual(Math.round(targetRect.x / gridSize) * gridSize);
    expect(newDraggableRect.y).toEqual(Math.round(targetRect.y / gridSize) * gridSize);
  });
});
