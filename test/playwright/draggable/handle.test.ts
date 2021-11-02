import { expect, test } from '@playwright/test';
import { getStorybookUrl } from '../../storybook/constant';
import { drag } from './drag';
import { draggableTestId, handleTestId, targetTestId } from './constant';

test.describe('given I have Draggable with handle', () => {
  test('then it should not move by dragging Draggable', async ({ page }) => {
    await page.goto(getStorybookUrl('draggable-handle'));

    const draggable = await page.waitForSelector(draggableTestId);
    const target = await page.waitForSelector(targetTestId);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const draggableRect = (await draggable.boundingBox())!;

    await drag(page, draggable, target);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newDraggableRect = (await draggable.boundingBox())!;

    expect(newDraggableRect.x).toEqual(draggableRect.x);
    expect(newDraggableRect.y).toEqual(draggableRect.y);
  });

  test('then it should not move by dragging handle', async ({ page }) => {
    await page.goto(getStorybookUrl('draggable-handle'));

    const draggable = await page.waitForSelector(draggableTestId);
    const handle = await page.waitForSelector(handleTestId);
    const target = await page.waitForSelector(targetTestId);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const targetRect = (await target.boundingBox())!;

    await drag(page, handle, target);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newDraggableRect = (await draggable.boundingBox())!;

    expect(newDraggableRect.y).toEqual(targetRect.y);
  });
});
