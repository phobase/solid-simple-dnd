import { expect, test } from '@playwright/test';
import { getStorybookUrl } from '../../storybook/constant';
import { drag } from './drag';
import { draggableTestId, targetTestId } from './constant';

test.describe('given I have Draggable', () => {
  test('then it should move to target', async ({ page }) => {
    await page.goto(getStorybookUrl('draggable-simple'));

    const draggable = await page.waitForSelector(draggableTestId);
    const target = await page.waitForSelector(targetTestId);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const targetRect = (await target.boundingBox())!;

    await drag(page, draggable, target);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newDraggableRect = (await draggable.boundingBox())!;

    expect(newDraggableRect.x).toEqual(targetRect.x);
    expect(newDraggableRect.y).toEqual(targetRect.y);
  });
});
