/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */

function hasWrapper(el) {
  return !!el.firstElementChild && window.getComputedStyle(el.firstElementChild).display === 'block';
}

export default function decorate(block) {
  [...block.children].forEach((row) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.setAttribute('itemscope', '');
    summary.setAttribute('itemprop', 'mainEntity');
    summary.setAttribute('itemtype', 'https://schema.org/Question');
    summary.append(...label.childNodes);
    if (!hasWrapper(summary)) {
      summary.innerHTML = `<p itemprop="name">${summary.innerHTML}</p>`;
    }
    // decorate accordion item body
    const body = row.children[1];
    body.className = 'accordion-item-body';
    body.setAttribute('itemscope', '');
    body.setAttribute('itemprop', 'acceptedAnswer');
    body.setAttribute('itemtype', 'https://schema.org/Answer');
    if (!hasWrapper(body)) {
      body.innerHTML = `<p itemprop="text">${body.innerHTML}</p>`;
    }
    // decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);
    row.replaceWith(details);
  });
}
