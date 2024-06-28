function navigateTo(element) {
    const link = element.getAttribute('data-link');
    window.location.href = link;
}