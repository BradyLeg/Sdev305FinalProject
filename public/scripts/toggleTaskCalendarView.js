function toggleTaskDetails(button)
{
    const details = button.parentElement.nextElementSibling;

    if (!details.classList.contains("visible"))
    {
        details.classList.add("visible");
        button.textContent = "Hide Details";
    } 
    else
    {
        details.classList.remove("visible");
        button.textContent = "Show Details";
    }
}
