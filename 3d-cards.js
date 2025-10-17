// js/3d-cards.js
class Card3DEffect {
    constructor(card) {
        this.card = card;
        this.isHovering = false;
        this.init();
    }

    init() {
        this.card.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.card.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        this.card.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }

    handleMouseMove(e) {
        if (!this.isHovering) return;

        const rect = this.card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = ((x - centerX) / centerX) * 10;
        const rotateX = ((centerY - y) / centerY) * 10;
        
        this.card.style.transform = `
            translateY(-20px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
            scale(1.05)
        `;

        const shadowX = (x - centerX) / 10;
        const shadowY = (y - centerY) / 10;
        
        this.card.style.boxShadow = `
            ${shadowX}px ${shadowY}px 50px rgba(138, 43, 226, 0.4),
            0 0 100px rgba(255, 0, 128, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `;
    }

    handleMouseEnter() {
        this.isHovering = true;
        this.card.style.animation = 'none';
    }

    handleMouseLeave() {
        this.isHovering = false;
        this.card.style.transform = '';
        this.card.style.boxShadow = '';
        this.card.style.animation = 'float-3d 6s ease-in-out infinite';
    }
}

// Экспорт функции для инициализации
function init3DCards() {
    const cards = document.querySelectorAll('.event-card-3d');
    cards.forEach(card => new Card3DEffect(card));
    console.log('🎮 3D Cards initialized:', cards.length, 'cards');
}

// Автоматическая инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    // Даем время на загрузку всех стилей
    setTimeout(init3DCards, 100);
});
