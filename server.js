const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Realistic Data for Talks
const talks = [
    {
        title: "The Future of Node.js",
        speaker: "Ryan Dahl",
        category: "Backend",
        duration: 45,
        description: "An in-depth look at the roadmap for Node.js, new features in the latest LTS, and security improvements."
    },
    {
        title: "Modern CSS Architecture",
        speaker: "Jen Simmons",
        category: "Frontend",
        duration: 30,
        description: "How to leverage CSS Grid, Subgrid, and Container Queries to build resilient and responsive layouts."
    },
    {
        title: "Scaling Microservices",
        speaker: "Sam Newman",
        category: "DevOps",
        duration: 40,
        description: "Best practices for decomposing monoliths and managing communication between microservices at scale."
    },
    {
        title: "Accessibility for Everyone",
        speaker: "Léonie Watson",
        category: "Frontend",
        duration: 35,
        description: "Practical tips for making your web applications accessible to users with disabilities using ARIA and semantic HTML."
    },
    // Lunch will be inserted here logic-wise
    {
        title: "AI in Web Development",
        speaker: "Andrew Ng",
        category: "AI",
        duration: 45,
        description: "Integrating Large Language Models into standard web apps to enhance user experience."
    },
    {
        title: "GraphQL vs REST",
        speaker: "Eve Porcello",
        category: "Backend",
        duration: 30,
        description: "A comparative analysis of API paradigms and when to choose one over the other."
    }
];

// Helper to format time (e.g., "10:00 AM")
function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

// Helper to add minutes to a Date object
function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

app.get('/api/schedule', (req, res) => {
    const schedule = [];
    
    // Start at 10:00 AM today
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0);

    const LUNCH_TIME_HOUR = 13; // 1:00 PM
    let lunchAdded = false;

    for (let i = 0; i < talks.length; i++) {
        const talk = talks[i];
        
        // Calculate potential end time
        let tentativeEndTime = addMinutes(currentTime, talk.duration);

        // Check if we need to insert Lunch (Fixed at 13:00)
        // If the current talk pushes past 13:00, OR if we naturally arrived at 13:00+
        // For this specific logic, we prioritize the Fixed Time. 
        // If a talk would end after 13:00, we check if it started before 13:00.
        // To keep it simple for this data set, if the Next Start Time is >= 13:00, we insert lunch first.
        
        if (!lunchAdded && (currentTime.getHours() >= LUNCH_TIME_HOUR)) {
            // It is time for lunch
            // Reset current time to exactly 13:00 if it drifted past (though we try to avoid that)
            // or just start lunch now.
            
            // Force Lunch at 13:00 if we are close (e.g. 12:55) or just place it now.
            // For a strict schedule, let's say we just insert it when the flow reaches here.
            
            // Correction: The requirements asked for a fixed time. 
            // We will insert the lunch break object explicitly.
            
            // If we are before 13:00, but this talk pushes us way past, that's an issue with the schedule data.
            // With the provided data:
            // 10:00 - 10:45 (Trans 10) -> 10:55
            // 10:55 - 11:25 (Trans 10) -> 11:35
            // 11:35 - 12:15 (Trans 10) -> 12:25
            // 12:25 - 13:00 (35m talk) -> Ends exactly at 13:00.
            
            const lunchStart = new Date(currentTime);
            lunchStart.setHours(13, 0, 0, 0);
             
            // If the current flow time is less than 13:00, we might have a gap. 
            // If it is > 13:00, we are late. 
            // Let's assume we sync up to 13:00.
            if (currentTime < lunchStart) {
                 currentTime = lunchStart;
            }
            
            const lunchEnd = addMinutes(currentTime, 60);
            
            schedule.push({
                title: "Lunch Break",
                isBreak: true,
                startTime: formatTime(currentTime),
                endTime: formatTime(lunchEnd),
                duration: 60,
                category: "Break",
                description: "Refuel and network."
            });
            
            currentTime = lunchEnd;
            lunchAdded = true;
        }

        // Now process the actual talk
        const startTime = new Date(currentTime);
        const endTime = addMinutes(startTime, talk.duration);
        
        schedule.push({
            ...talk,
            startTime: formatTime(startTime),
            endTime: formatTime(endTime),
            isBreak: false
        });

        // Add 10 mins transition
        currentTime = addMinutes(endTime, 10);
    }

    res.json(schedule);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
