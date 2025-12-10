document.addEventListener('DOMContentLoaded', () => {
    const scheduleList = document.getElementById('schedule-list');
    const searchInput = document.getElementById('categoryInput');

    // Fetch the schedule from the server
    fetch('/api/schedule')
        .then(response => response.json())
        .then(data => {
            renderSchedule(data);
        })
        .catch(err => {
            scheduleList.innerHTML = '<p style="text-align:center; color:red;">Error loading schedule.</p>';
            console.error(err);
        });

    function renderSchedule(data) {
        scheduleList.innerHTML = ''; // Clear loading text

        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            // Add a specific class if it's a break/lunch for styling
            if (item.isBreak) {
                card.classList.add('break');
            }

            // Store category in data attribute for easy filtering
            card.setAttribute('data-category', item.category.toLowerCase());

            // Construct HTML content
            let metaHtml = '';
            if (!item.isBreak) {
                metaHtml = `<div class="meta">
                    <span>Speaker: <strong>${item.speaker}</strong></span>
                    <span class="badge">${item.category}</span>
                    <span> • ${item.duration} mins</span>
                </div>`;
            } else {
                metaHtml = `<div class="meta">
                    <span class="badge">${item.category}</span>
                    <span> • ${item.duration} mins</span>
                </div>`;
            }

            card.innerHTML = `
                <div class="time-slot">${item.startTime} - ${item.endTime}</div>
                <h2>${item.title}</h2>
                ${metaHtml}
                <p class="description">${item.description}</p>
            `;

            scheduleList.appendChild(card);
        });

        // Enable search functionality after rendering
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.card');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                // If search is empty, show all. 
                // If it's a break, decide if we want to show it. 
                // Usually in search, we might hide breaks if they don't match, 
                // but let's just filter by text.
                
                // Rule: If search term is empty, show everything.
                // If search term matches category, show it.
                // Always show 'break' category? Or allow searching for "break"?
                // Let's allow simple filtering.
                
                if (category.includes(searchTerm) || searchTerm === '') {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    }
});
