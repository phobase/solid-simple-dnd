import { expect, test } from '@playwright/test';
import { getStorybookUrl } from '../../storybook/constant';
import { draggableTestId, overlayTestId, targetTestId } from './constant';

test.describe('given I have Overlay', () => {
  test('then it should move Overlay to target', async ({ page }) => {
    await page.goto(getStorybookUrl('draggable-overlay'));

    const draggable = await page.waitForSelector(draggableTestId);
    const target = await page.waitForSelector(targetTestId);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const targetRect = (await target.boundingBox())!;

    await draggable.hover({ position: { x: 0, y: 0 } });
    await page.mouse.down();

    await page.mouse.move(targetRect.x, targetRect.y);

    const overlay = await page.waitForSelector(overlayTestId);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const overlayRect = (await overlay.boundingBox())!;

    expect(overlayRect.x).toEqual(targetRect.x);
    expect(overlayRect.y).toEqual(targetRect.y);
  });

  test('then it should not move Draggable', async ({ page }) => {
    await page.goto(getStorybookUrl('draggable-overlay'));

    const draggable = await page.waitForSelector(draggableTestId);
    const rect = (await draggable.boundingBox())!;

    const target = await page.waitForSelector(targetTestId);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const targetRect = (await target.boundingBox())!;

    await draggable.hover({ position: { x: 0, y: 0 } });
    await page.mouse.down();

    await page.mouse.move(targetRect.x, targetRect.y);

    const newDraggable = await page.waitForSelector(draggableTestId);

    const newRect = (await newDraggable.boundingBox())!;

    expect(newRect.x).toEqual(rect.x);
    expect(newRect.y).toEqual(rect.y);
  });
});
