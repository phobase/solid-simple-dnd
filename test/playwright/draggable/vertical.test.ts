import { expect, test } from '@playwright/test';
import { getStorybookUrl } from '../../storybook/constant';
import { draggableTestId, targetTestId } from './constant';
import { drag } from './drag';

test.describe('given I have vertical Draggable', () => {
  test('then it should move vertically only', async ({ page }) => {
    await page.goto(getStorybookUrl('draggable-vertical'));

    const draggable = await page.waitForSelector(draggableTestId);
    const target = await page.waitForSelector(targetTestId);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const draggableRect = (await draggable.boundingBox())!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const targetRect = (await target.boundingBox())!;

    await drag(page, draggable, target);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newDraggableRect = (await draggable.boundingBox())!;

    expect(newDraggableRect.x).toEqual(draggableRect.x);
    expect(newDraggableRect.y).toEqual(targetRect.y);
  });
});
