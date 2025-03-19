document.addEventListener('DOMContentLoaded', () => {
    const taskElements = document.querySelectorAll(".day p");
    taskElements.forEach(el => {
        el.classList.add("highlight");
    });
});