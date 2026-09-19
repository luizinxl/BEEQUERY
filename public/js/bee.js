function initBees() {
    const BEE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTH4m4SSA5YH63AxZIS2porJwMDU1n3sUoXgOI2Xr0Sz_83Q0GB2wW8gjTdUJ0Oi8hv8_yy6eAxc_oA97Uw4KwydlUP816-KA1oTHHgfGmIT03TF9DECixnXaB4hGOiEFU6tpcrExCR-2erMgKHXknFUNMU56RCk_bvTFBfNY_DCMjS12XI25g2R3o46XPtfklEidIKebhM91_cCbsJU3M9KJQFHvq3_WUthfYNrzL6sgg8E5emJ5U6EjKYvDdSiG2q1A';

    // Encontra os cards principais da página
    const cards = Array.from(document.querySelectorAll('.rounded-xl, .rounded-2xl, .bg-surface-container'));
    
    // Escolhe alguns cards aleatórios para colocar as abelhas (ex: 5 abelhas espalhadas)
    const numBees = Math.min(5, cards.length);
    const selectedCards = cards.sort(() => 0.5 - Math.random()).slice(0, numBees);

    selectedCards.forEach(card => {
        const bee = document.createElement('img');
        bee.src = BEE_URL;
        bee.style.position = 'absolute';
        bee.style.width = '48px';
        bee.style.height = '48px';
        bee.style.pointerEvents = 'none';
        bee.style.zIndex = '50';
        bee.style.filter = 'drop-shadow(0px 4px 6px rgba(0,0,0,0.3))';

        // Garante que o card seja 'relative' para a abelha ficar posicionada nele
        if (getComputedStyle(card).position === 'static') {
            card.style.position = 'relative';
        }

        // Escolhe um canto aleatório
        const corner = Math.floor(Math.random() * 4);
        const offset = -24; // Faz a abelha ficar "na borda" do card

        let baseRotation = 0;

        if (corner === 0) { // Top-Left
            bee.style.top = `${offset}px`;
            bee.style.left = `${offset}px`;
            baseRotation = -45;
        } else if (corner === 1) { // Top-Right
            bee.style.top = `${offset}px`;
            bee.style.right = `${offset}px`;
            baseRotation = 45;
        } else if (corner === 2) { // Bottom-Left
            bee.style.bottom = `${offset}px`;
            bee.style.left = `${offset}px`;
            baseRotation = -135;
        } else { // Bottom-Right
            bee.style.bottom = `${offset}px`;
            bee.style.right = `${offset}px`;
            baseRotation = 135;
        }

        // Adiciona um pouco de aleatoriedade no ângulo
        const randomRotation = baseRotation + (Math.random() * 60 - 30);
        bee.style.transform = `rotate(${randomRotation}deg)`;

        card.appendChild(bee);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBees);
} else {
    initBees();
}
