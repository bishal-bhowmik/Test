// 1. Find all the rich text wrappers on the page
const richTextWrappers = document.querySelectorAll('.rich-text-anim-wrapper');

richTextWrappers.forEach(wrapper => {
  // 2. Read what animation styles this section should use (Removed the forced defaults!)
  const headingStyle = wrapper.getAttribute('data-heading-anim');
  const textStyle = wrapper.getAttribute('data-text-anim');

  // 3. Only animate headings IF the heading data attribute exists
  if (headingStyle) {
    const headings = wrapper.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
      heading.classList.add('js-anim-trigger');
      heading.setAttribute('data-anim', headingStyle);
    });
  }

  // 4. Only animate text blocks IF the text data attribute exists
  if (textStyle) {
    const textBlocks = wrapper.querySelectorAll('p, li, div, span, blockquote, pre, figcaption, td, th, dt, dd');
    textBlocks.forEach(text => {
      text.classList.add('js-anim-trigger');
      text.setAttribute('data-anim', textStyle);
    });
  }
});