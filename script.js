document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const selectedPriceElement = document.getElementById('selected-price');
    const addToCartButton = document.querySelector('.add-to-cart-btn');
    
    // Prices for each option (1 unit, 2 units, 3 units)
    const prices = ['$10.00', '$18.00', '$25.00'];
    const colors = ['#FFE6EB', '#FFE6EB', '#FFE6EB'];
    
    // Track the currently selected card (for click)
    let currentlySelectedCard = null;
    
    // Function to update the selected card
    function updateSelectedCard(selectedRadio, isHover = false) {
        const selectedCard = selectedRadio ? selectedRadio.closest('.card') : null;
        
        // Update visual selection (only for click, not hover)
        if (!isHover) {
            // Remove selected class from all cards and reset styles
            cards.forEach(card => {
                card.classList.remove('selected');
                card.style.backgroundColor = 'white';
                card.style.borderColor = '#e0e0e0';
            });

            if (selectedCard) {
                selectedCard.classList.add('selected');
                selectedRadio.checked = true;
                selectedCard.style.borderColor = '#ffb8c6';
                
                // Update the price
                const radioIndex = Array.from(radioButtons).indexOf(selectedRadio);
                if (radioIndex >= 0 && radioIndex < prices.length) {
                    selectedPriceElement.textContent = prices[radioIndex];
                    selectedCard.style.backgroundColor = colors[radioIndex];
                }
                
                currentlySelectedCard = selectedCard;
            } else {
                currentlySelectedCard = null;
            }
        }
        
        // Update expanded state (for both hover and click)
        cards.forEach(card => {
            if (card === selectedCard) {
                card.classList.add('expanded');
            } else if (!card.matches(':hover')) { // Only collapse if not being hovered
                card.classList.remove('expanded');
            }
        });
    }
    
    // Add click event to radio buttons
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            updateSelectedCard(this, false);
        });
    });
    
    // Add hover events to cards
    cards.forEach(card => {
        // Expand on hover
        card.addEventListener('mouseenter', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                updateSelectedCard(radio, true);
            }
        });
        
        // Collapse on mouse leave if not selected
        card.addEventListener('mouseleave', function() {
            if (this !== currentlySelectedCard) {
                this.classList.remove('expanded');
            }
        });
        
        // Handle click to select
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'SELECT') return;
            
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                if (this === currentlySelectedCard) {
                    updateSelectedCard(null, false);
                    this.classList.remove('expanded');
                } else {
                    updateSelectedCard(radio, false);
                }
            }
        });
    });
    
    // Select the first card by default
    if (radioButtons.length > 0) {
        radioButtons[0].click();
    }
    
    // Add to cart button click handler
    addToCartButton.addEventListener('click', function() {
        // Show a simple alert when the button is clicked
        alert('Item added to cart!');
    });
    
    // Initialize with the first radio button selected
    if (radioButtons.length > 0) {
        updateSelectedCard(radioButtons[0]);
    }
});
