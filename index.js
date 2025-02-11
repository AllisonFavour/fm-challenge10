// Dynamically update footer year
document.getElementById('js-footer-year').innerText = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
    const timeframes = document.querySelectorAll(".dates span");
    const dataContainer = document.querySelectorAll(".box.position");
  
    let activeTimeframe = "weekly"; // Default active state
  
    // Fetch data.json
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            updateUI(data, activeTimeframe);

            // Add event listeners to each timeframe option
            timeframes.forEach(timeframe => {
                timeframe.addEventListener("click", () => {
                    activeTimeframe = timeframe.textContent.toLowerCase();
                    updateUI(data, activeTimeframe);

                    // Update active state styling
                    timeframes.forEach(t => t.classList.remove("weekly"));
                    timeframe.classList.add("weekly");
                });
            });
        })
        .catch(error => console.error("Error fetching data:", error));

    // Function to update the UI
    function updateUI(data, timeframe) {
        dataContainer.forEach((box, index) => {
            const current = data[index].timeframes[timeframe].current;
            const previous = data[index].timeframes[timeframe].previous;
            const bottom = box.querySelector(".bottom");

            bottom.innerHTML = `
                <span>${current}hrs</span>
                <span>Last ${timeframe === "daily" ? "day" : timeframe === "weekly" ? "week" : "month"} - <span class="previous">${previous}hrs</span></span>
            `;
        });
    }
});