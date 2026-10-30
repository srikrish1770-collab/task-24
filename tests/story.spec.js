import {test, expect} from '@playwright/test';

test('story reveal, bounded parallax, hover, keyboard and navigation', async ({page}) => {
  await page.goto('/');
  const story = page.locator('.story-section');
  await story.scrollIntoViewIfNeeded();
  await expect(story.locator('.story-reveal')).toHaveCSS('opacity', '1');
  await expect(story.getByRole('heading')).toHaveCSS('opacity', '1');
  await page.waitForTimeout(1100);
  const revealTransform = await story.locator('.story-reveal').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).a);
  expect(revealTransform).toBeCloseTo(1, 2);
  const photo = story.locator('.story-photo');
  await photo.hover();
  await page.waitForTimeout(700);
  expect(await story.locator('.story-hover').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).a)).toBeCloseTo(1.03, 2);
  const coverage = await story.locator('.story-parallax').evaluate(el => {
    const frame = el.closest('.story-photo').getBoundingClientRect();
    const image = el.getBoundingClientRect();
    return image.top <= frame.top && image.bottom >= frame.bottom;
  });
  expect(coverage).toBe(true);
  const link = story.getByRole('link', {name: 'Discover our story'});
  await page.mouse.move(0,0);
  await link.focus();
  await expect(link).toBeFocused();
  await page.waitForTimeout(450);
  expect(await link.evaluate(el => new DOMMatrix(getComputedStyle(el,'::after').transform).a)).toBeCloseTo(1,2);
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/about$/);
  await page.goBack();
  await expect(page.locator('.story-reveal')).toHaveCSS('opacity','1');
});

test('story fits desktop, tablet and mobile without clipping', async ({page}) => {
  for (const width of [360,768,1024,1440]) {
    await page.setViewportSize({width, height:900});
    await page.goto('/');
    const story = page.locator('.story-section');
    await story.scrollIntoViewIfNeeded();
    await expect(story.locator('h2')).toHaveCSS('opacity','1');
    await page.waitForTimeout(1100);
    const layout = await story.evaluate(el => {
      const copy = el.querySelector('.story-copy');
      const image = el.querySelector('.story-photo').getBoundingClientRect();
      const text = copy.getBoundingClientRect();
      return {overflow:document.documentElement.scrollWidth > innerWidth, clipped:copy.scrollWidth>copy.clientWidth, stacked:text.top >= image.bottom - 1};
    });
    expect(layout.overflow).toBe(false);
    expect(layout.clipped).toBe(false);
    expect(layout.stacked).toBe(width<768);
    if(width<1024) await expect(story.locator('.story-parallax')).toHaveCount(0);
    await story.screenshot({path:`test-results/story-${width}.png`});
  }
});

test('reduced motion keeps content visible and removes parallax and zoom', async ({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  const story=page.locator('.story-section');
  await story.scrollIntoViewIfNeeded();
  await expect(story.locator('h2')).toHaveCSS('opacity','1');
  await expect(story.locator('.story-parallax')).toHaveCount(0);
  await story.locator('.story-photo').hover();
  await expect(story.locator('.story-hover')).toHaveCSS('transform','none');
});

