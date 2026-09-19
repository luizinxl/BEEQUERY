function initBee() {
    console.log('🐝 Inicializando abelha...');
    // Logo / Bee Image URL
    const BEE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTH4m4SSA5YH63AxZIS2porJwMDU1n3sUoXgOI2Xr0Sz_83Q0GB2wW8gjTdUJ0Oi8hv8_yy6eAxc_oA97Uw4KwydlUP816-KA1oTHHgfGmIT03TF9DECixnXaB4hGOiEFU6tpcrExCR-2erMgKHXknFUNMU56RCk_bvTFBfNY_DCMjS12XI25g2R3o46XPtfklEidIKebhM91_cCbsJU3M9KJQFHvq3_WUthfYNrzL6sgg8E5emJ5U6EjKYvDdSiG2q1A';

    const beeWrapper = document.createElement('div');
    beeWrapper.id = 'bee-wrapper';
    beeWrapper.style.position = 'absolute';
    beeWrapper.style.pointerEvents = 'none'; // Don't block clicks
    beeWrapper.style.zIndex = '9999';
    beeWrapper.style.width = '0px';
    beeWrapper.style.height = '0px';

    const beeInner = document.createElement('div');
    beeInner.style.width = '48px'; 
    beeInner.style.height = '48px';
    beeInner.style.backgroundImage = `url("${BEE_URL}")`;
    beeInner.style.backgroundSize = 'contain';
    beeInner.style.backgroundRepeat = 'no-repeat';
    beeInner.style.backgroundPosition = 'center';
    beeInner.style.filter = 'drop-shadow(0px 8px 12px rgba(0,0,0,0.4))';
    beeInner.style.position = 'absolute';
    beeInner.style.left = '-24px';
    beeInner.style.top = '-24px';
    
    // CSS animations
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes beeHover {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-5px) rotate(3deg); }
            100% { transform: translateY(0px) rotate(-2deg); }
        }
        @keyframes beeFly {
            0% { transform: translateY(0px) rotate(0deg) scale(1); }
            25% { transform: translateY(-3px) rotate(2deg) scale(0.95); }
            50% { transform: translateY(0px) rotate(-1deg) scale(1); }
            75% { transform: translateY(3px) rotate(3deg) scale(1.05); }
            100% { transform: translateY(0px) rotate(0deg) scale(1); }
        }
        .bee-hovering {
            animation: beeHover 2s infinite ease-in-out;
        }
        .bee-flying {
            animation: beeFly 0.15s infinite linear;
        }
    `;
    document.head.appendChild(style);

    beeInner.className = 'bee-hovering'; 
    beeWrapper.appendChild(beeInner);
    document.body.appendChild(beeWrapper);

    let beePos = { x: window.innerWidth / 2, y: window.scrollY + window.innerHeight / 2 };
    let currentAngle = 0;
    
    // A imagem original tem a cabeça da abelha apontando para sudoeste (bottom-left)
    const IMAGE_ANGLE_OFFSET = -135; 

    updateBeeTransform(beePos.x, beePos.y, currentAngle + IMAGE_ANGLE_OFFSET);

    function getCards() {
        return Array.from(document.querySelectorAll('.rounded-xl, .rounded-2xl, .bg-surface-container'));
    }

    function getRandomTarget() {
        const cards = getCards();
        const useCard = cards.length > 0 && Math.random() > 0.3; 
        
        let targetX, targetY;

        if (useCard) {
            const card = cards[Math.floor(Math.random() * cards.length)];
            const rect = card.getBoundingClientRect();
            
            const isCorner = Math.random() > 0.4;
            if (isCorner) {
                const corners = [
                    { x: rect.left, y: rect.top },
                    { x: rect.right, y: rect.top },
                    { x: rect.left, y: rect.bottom },
                    { x: rect.right, y: rect.bottom }
                ];
                const corner = corners[Math.floor(Math.random() * corners.length)];
                targetX = corner.x + window.scrollX + (Math.random() * 40 - 20);
                targetY = corner.y + window.scrollY + (Math.random() * 40 - 20);
            } else {
                targetX = rect.left + window.scrollX + (rect.width * 0.2) + Math.random() * (rect.width * 0.6);
                targetY = rect.top + window.scrollY + (rect.height * 0.2) + Math.random() * (rect.height * 0.6);
            }
        } else {
            targetX = window.scrollX + 50 + Math.random() * (window.innerWidth - 100);
            targetY = window.scrollY + 50 + Math.random() * (window.innerHeight - 100);
        }

        return { x: targetX, y: targetY };
    }

    function updateBeeTransform(x, y, angle) {
        beeWrapper.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
    }

    function fly() {
        const target = getRandomTarget();
        const dist = Math.hypot(target.x - beePos.x, target.y - beePos.y);
        
        if (dist < 100) {
            setTimeout(fly, 1000);
            return;
        }

        beeInner.className = 'bee-flying';

        const midX = (beePos.x + target.x) / 2;
        const midY = (beePos.y + target.y) / 2;
        const angleToTarget = Math.atan2(target.y - beePos.y, target.x - beePos.x);
        
        const offsetDir = Math.random() > 0.5 ? 1 : -1;
        const offset = dist * (0.3 + Math.random() * 0.4) * offsetDir;
        
        const controlPt = {
            x: midX + Math.cos(angleToTarget + Math.PI / 2) * offset,
            y: midY + Math.sin(angleToTarget + Math.PI / 2) * offset
        };

        const duration = Math.max(1500, dist * 2); 
        let startTime = null;

        function animateFlight(time) {
            if (!startTime) startTime = time;
            const elapsed = time - startTime;
            let t = elapsed / duration;

            if (t > 1) t = 1;

            const easedT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

            const u = 1 - easedT;
            const tt = easedT * easedT;
            const uu = u * u;

            const x = uu * beePos.x + 2 * u * easedT * controlPt.x + tt * target.x;
            const y = uu * beePos.y + 2 * u * easedT * controlPt.y + tt * target.y;

            const dx = 2 * u * (controlPt.x - beePos.x) + 2 * easedT * (target.x - controlPt.x);
            const dy = 2 * u * (controlPt.y - beePos.y) + 2 * easedT * (target.y - controlPt.y);
            
            let angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            let angleDiff = angle - currentAngle;
            while (angleDiff > 180) angleDiff -= 360;
            while (angleDiff < -180) angleDiff += 360;
            
            currentAngle += angleDiff * 0.15; 
            
            updateBeeTransform(x, y, currentAngle + IMAGE_ANGLE_OFFSET);

            if (t < 1) {
                requestAnimationFrame(animateFlight);
            } else {
                beePos = { x: target.x, y: target.y };
                beeInner.className = 'bee-hovering';
                
                const waitTime = 3000 + Math.random() * 5000;
                setTimeout(fly, waitTime);
            }
        }

        requestAnimationFrame(animateFlight);
    }

    setTimeout(fly, 2000); 
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBee);
} else {
    initBee();
}
