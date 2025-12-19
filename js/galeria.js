document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('nftModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const closeBtn = document.getElementById('closeModalBtn');
    const buyBtn = document.getElementById('buyBtn');
    
    // Seleciona todos os cards
    const cards = document.querySelectorAll('.nft-card');

    function openModal(title, price, imgSrc) {
        modalImg.src = imgSrc;
        modalTitle.innerText = title;
        modalPrice.innerText = price;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }

    // Adiciona evento de clique a cada card dinamicamente
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.dataset.title;
            const price = card.dataset.price;
            const img = card.dataset.img;
            openModal(title, price, img);
        });
    });

    // Eventos de fechamento
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    buyBtn.addEventListener('click', () => alert('Função de compra (Demo)'));
});