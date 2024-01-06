// script.js

function toggleAnswer(element) {
    const parent = element.parentElement;
    parent.classList.toggle("active");
    element.classList.toggle("active");
    element.classList.toggle("clicked", parent.classList.contains("active"));
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight;
}

function handleVisibility() {
    const asks = document.querySelectorAll('.anim');

    asks.forEach(function (ask) {
        if (isInViewport(ask) && !ask.classList.contains('visible')) {
            ask.classList.add('visible');
        }
    });
}

document.addEventListener('scroll', handleVisibility);
document.addEventListener('resize', handleVisibility);

// Для виклику при завантаженні сторінки
document.addEventListener('DOMContentLoaded', handleVisibility);



function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
        const offset = -100; // Змініть це значення на величину відступу, яку ви хочете

        window.scrollTo({
            top: targetElement.offsetTop + offset,
            behavior: 'smooth'
        });
    }
}


document.querySelector('.no-controls').addEventListener('click', function (event) {
    event.preventDefault();
});

document.addEventListener('DOMContentLoaded', function () {
    const video = document.querySelector('video');
    const container = document.querySelector('.about__us__content');

    document.addEventListener('scroll', function () {
        const containerRect = container.getBoundingClientRect();
        const centerY = window.innerHeight / 10;

        if (
            containerRect.top <= centerY &&
            containerRect.bottom >= centerY
        ) {
            const translateY = centerY - containerRect.top;
            const maxTranslateY = (centerY * 4) + containerRect.height - window.innerHeight;
            video.style.transform = `translateY(${Math.min(translateY, maxTranslateY)}px)`;
        } else {
            video.style.transform = '';
        }
    });
});




// Знаходимо всі елементи .review
const reviewElements = document.querySelectorAll('.review');

// Проходимося по кожному .review і встановлюємо обробник подій
reviewElements.forEach((reviewElement) => {
    const block = reviewElement.querySelector('.floating-element');
    const textBlock = reviewElement.querySelector('.floating-element-text');
    let targetX = 0;
    let targetY = 0;

    reviewElement.addEventListener('mousemove', (event) => {
        var rect = reviewElement.getBoundingClientRect();
        targetX = event.clientX - rect.left;  
        targetY = event.clientY - rect.top;   

        if (!animationFrameId) {
            requestAnimationFrame(() => updateBlockPosition(block,false));
            requestAnimationFrame(() => updateBlockPosition(textBlock,true));

        }
    });


    let animationFrameId;

    function updateBlockPosition(block,isLess) {
        const currentX = parseFloat(block.style.left) || 200;
        const currentY = parseFloat(block.style.top) || (isLess ? 150 : 250);

        const newX = currentX + (targetX - currentX) * 0.1;
        const newY = currentY + (targetY - currentY) * 0.1;

        block.style.left = newX + 'px';
        block.style.top = newY + 'px';

        if (Math.abs(newX - targetX) > 0.1 || Math.abs(newY - targetY) > 0.1) {
            animationFrameId = requestAnimationFrame(() => updateBlockPosition(block));
        } else {
            animationFrameId = null;
        }
    }


    reviewElement.addEventListener('mouseleave', () => {
        setTimeout(() => {
            block.style.left = '50%';
            block.style.top = '50%';        
        }, 1000);
        setTimeout(() => { 
            textBlock.style.left = '50%';
            textBlock.style.top = '50%'; 
        }, 1000);
    });
    
});