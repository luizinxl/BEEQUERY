// BeeQuery - Abelhas decorativas espalhadas pelo site
(function () {
    const BEE_URL = '/img/bee.png?v=3';

    function placeBees() {
        // Remove abelhas anteriores se já existirem para evitar duplicatas
        document.querySelectorAll('.bee-scattered').forEach(el => el.remove());

        // Seleciona elementos de cards e containers da página
        const allCandidates = Array.from(document.querySelectorAll(
            '.bg-surface-container, .bg-surface-container-high, .rounded-xl, .rounded-2xl, [class*="border-outline-variant"]'
        )).filter(el => {
            // Ignora elementos muito pequenos (como botões, badges, ícones ou o próprio modal)
            const rect = el.getBoundingClientRect();
            if (rect.width < 120 || rect.height < 80) return false;
            if (el.closest('#modal-overlay') || el.closest('header') || el.closest('nav')) return false;
            return true;
        });

        if (allCandidates.length === 0) return;

        // Filtra para manter apenas containers pai ou nós únicos bem distribuídos
        const uniqueCards = [];
        allCandidates.forEach(card => {
            const hasChildCard = uniqueCards.some(existing => card.contains(existing));
            if (!hasChildCard) {
                uniqueCards.push(card);
            }
        });

        // Embaralha e escolhe entre 6 e 9 cards para colocar as abelhas
        const shuffled = uniqueCards.sort(() => 0.5 - Math.random());
        const count = Math.min(8, Math.max(4, Math.floor(shuffled.length * 0.4)));
        const selected = shuffled.slice(0, count);

        selected.forEach((card, index) => {
            const bee = document.createElement('img');
            bee.src = BEE_URL;
            bee.alt = 'BeeQuery';
            bee.title = 'BeeQuery 🐝';
            bee.className = 'bee-scattered';
            
            const size = Math.floor(Math.random() * 12) + 38; // Entre 38px e 50px
            bee.style.width = `${size}px`;
            bee.style.height = `${size}px`;
            bee.style.position = 'absolute';
            bee.style.zIndex = '30';
            bee.style.pointerEvents = 'auto';
            bee.style.cursor = 'pointer';
            bee.style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
            bee.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))';
            bee.style.userSelect = 'none';

            // Garante que o card suporte posicionamento absoluto
            const cardComputed = window.getComputedStyle(card);
            if (cardComputed.position === 'static') {
                card.style.position = 'relative';
            }

            // Verifica se o card tem overflow hidden
            const isOverflowHidden = cardComputed.overflow === 'hidden' || 
                                     cardComputed.overflowX === 'hidden' || 
                                     cardComputed.overflowY === 'hidden';

            // Escolhe uma posição aleatória (0: Top-Right, 1: Top-Left, 2: Bottom-Right, 3: Bottom-Left)
            const pos = Math.floor(Math.random() * 4);
            const edgeOffset = isOverflowHidden ? 10 : -(size * 0.35); // Se for hidden, fica para dentro
            let baseAngle = 0;

            if (pos === 0) { // Canto superior direito
                bee.style.top = `${edgeOffset}px`;
                bee.style.right = `${edgeOffset}px`;
                baseAngle = 15;
            } else if (pos === 1) { // Canto superior esquerdo
                bee.style.top = `${edgeOffset}px`;
                bee.style.left = `${edgeOffset}px`;
                baseAngle = -15;
            } else if (pos === 2) { // Canto inferior direito
                bee.style.bottom = `${edgeOffset}px`;
                bee.style.right = `${edgeOffset}px`;
                baseAngle = 35;
            } else { // Canto inferior esquerdo
                bee.style.bottom = `${edgeOffset}px`;
                bee.style.left = `${edgeOffset}px`;
                baseAngle = -35;
            }

            // Ângulo aleatório natural
            const rotation = baseAngle + (Math.random() * 40 - 20);
            bee.style.transform = `rotate(${rotation}deg)`;

            // Micro-interação ao passar o mouse
            bee.addEventListener('mouseenter', () => {
                bee.style.transform = `scale(1.25) rotate(${rotation + (Math.random() > 0.5 ? 12 : -12)}deg)`;
            });
            bee.addEventListener('mouseleave', () => {
                bee.style.transform = `scale(1) rotate(${rotation}deg)`;
            });

            card.appendChild(bee);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', placeBees);
    } else {
        placeBees();
    }
})();
