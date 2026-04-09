class Timeline {
    constructor() {
        this.journeys = {};
        this.currentJourney = 'ruqyah';
        this.init();
    }

    async init() {
        await this.loadJourneys();
        this.render();
        this.setupEventListeners();
    }

    async loadJourneys() {
        try {
            const response = await fetch('data/journeys.json');
            this.journeys = await response.json();
        } catch (error) {
            console.error('Error loading journeys:', error);
        }
    }

    render() {
        const timelineElement = document.getElementById('timeline');
        const journey = this.journeys[this.currentJourney];
        
        if (!journey) return;

        timelineElement.innerHTML = '';
        
        journey.items.forEach((item) => {
            const timelineItem = this.createTimelineItem(item);
            timelineElement.appendChild(timelineItem);
        });
    }

    createTimelineItem(item) {
        const div = document.createElement('div');
        div.className = 'timeline-item';
        
        const date = new Date(item.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        div.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-date">${date}</div>
                <div class="timeline-title">${item.title}</div>
                <div class="timeline-description">${item.description}</div>
            </div>
        `;
        
        return div;
    }

    setupEventListeners() {
        document.querySelectorAll('.journey-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.journey-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentJourney = e.target.dataset.journey;
                this.render();
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.timeline = new Timeline();
});