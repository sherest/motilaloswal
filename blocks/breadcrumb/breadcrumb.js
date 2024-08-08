export default function decorate(block) {
    let divExists = document.querySelectorAll('div[data-block-name="breadcrumb"]');
    if (divExists.length==1){
        const structuredDataText = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://main--motilaloswal--sherest.hlx.live/"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Futures Option"
            }]
          }
        const script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.textContent = JSON.stringify(structuredDataText);
        document.head.appendChild(script);
    }
}