// Menu burger
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-actions");
    burger.addEventListener("click", () => {
      nav.classList.toggle("active");
    });

    // Fonctionnalité de recherche
    const searchInput = document.getElementById('searchInput');
    const applianceCards = document.querySelectorAll('.appliance-card');

    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      
      applianceCards.forEach(card => {
        const applianceName = card.getAttribute('data-name').toLowerCase();
        
        if (applianceName.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });

    // Modal de paiement
    const modal = document.getElementById('paymentModal');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('paymentForm');
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');

    // Ouvrir le modal au clic sur une carte
    applianceCards.forEach(card => {
      card.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = this.getAttribute('data-price');
        
        document.getElementById('productName').textContent = name.charAt(0).toUpperCase() + name.slice(1);
        document.getElementById('productPrice').textContent = price;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêche le scroll
      });
    });

    // Fermer le modal
    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Réactive le scroll
      form.reset();
    }

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Formatage du numéro de carte
    cardNumberInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\s/g, '');
      let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
      e.target.value = formattedValue;
    });

    // Formatage de la date d'expiration
    expiryDateInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
      e.target.value = value;
    });

    // Validation CVV (chiffres uniquement)
    cvvInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });

    // Soumettre le formulaire
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const productName = document.getElementById('productName').textContent;
      const productPrice = document.getElementById('productPrice').textContent;
      
      alert(`Paiement validé pour ${productName} - ${productPrice}\n\nPlus qu'à récupérer votre commande dans notre ressourcerie ou à la faire livrer !\n\nMerci pour votre achat !`);
      
      closeModal();
    });

    // Fermer le modal avec Échap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }

    });
