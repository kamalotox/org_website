let activeLockCount = 0;
let savedStyles = null;

/**
 * Reference-counted background scroll lock shared by modals and drawers.
 * Prevents background page scrolling while overlays or popup forms are open.
 */
export function lockPageScroll() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  if (activeLockCount === 0) {
    const html = document.documentElement;
    const body = document.body;
    const scrollbarWidth = Math.max(0, window.innerWidth - html.clientWidth);

    savedStyles = {
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
      bodyPaddingRight: body.style.paddingRight
    };

    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    body.style.overflow = 'hidden';
    body.style.overscrollBehavior = 'none';

    if (scrollbarWidth > 0) {
      const currentPaddingRight =
        Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
    }
  }

  activeLockCount += 1;
  let released = false;

  return () => {
    if (released) return;
    released = true;

    activeLockCount = Math.max(0, activeLockCount - 1);
    if (activeLockCount === 0 && savedStyles) {
      const html = document.documentElement;
      const body = document.body;
      html.style.overflow = savedStyles.htmlOverflow;
      html.style.overscrollBehavior = savedStyles.htmlOverscroll;
      body.style.overflow = savedStyles.bodyOverflow;
      body.style.overscrollBehavior = savedStyles.bodyOverscroll;
      body.style.paddingRight = savedStyles.bodyPaddingRight;
      savedStyles = null;
    }
  };
}
