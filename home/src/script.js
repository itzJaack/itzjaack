document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav-bar nav ul');
    const links = document.querySelector('.links-bar nav ul');
    let isSlidingNav = false;
    let isSlidingLinks = false;

    function startSliding(element, isSliding) {
        if (!isSliding) {
            isSliding = true;
            element.style.animationPlayState = 'running';
        }
    }

    function stopSliding(element, isSliding) {
        if (isSliding) {
            isSliding = false;
            element.style.animationPlayState = 'paused';
        }
    }

    nav.addEventListener('mouseover', () => stopSliding(nav, isSlidingNav));
    nav.addEventListener('mouseout', () => startSliding(nav, isSlidingNav));

    links.addEventListener('mouseover', () => stopSliding(links, isSlidingLinks));
    links.addEventListener('mouseout', () => startSliding(links, isSlidingLinks));

    startSliding(nav, isSlidingNav);
    startSliding(links, isSlidingLinks);
});
