import { ElementHandle, Page } from '@playwright/test';

export const drag = async (
  page: Page,
  draggable: ElementHandle<SVGElement | HTMLElement>,
  target: ElementHandle<SVGElement | HTMLElement>,
): Promise<void> => {
  await draggable.hover();
  await page.mouse.down();

  const targetRect = (await target.boundingBox())!;
  await page.mouse.move(targetRect.x, targetRect.y);

  await target.hover();
  await page.mouse.up();
};
