        // Get elements
        const playButton = document.getElementById('play-button');
        const loadingPage = document.getElementById('loading-page');
        const mainContent = document.getElementById('main-content');
        const launchSound = document.getElementById('launch-sound');
        const bgMusic = document.getElementById('background-music');
        const profileCard = document.getElementById('profile-card');

        // Add ripple effect to button
        playButton.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            
            let ripple = document.createElement('span');
            ripple.className = 'button-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 700);
        });

        // Create background elements
        function createBackgroundElements() {
            // Create bubbles
            for (let i = 0; i < 15; i++) {
                const bubble = document.createElement('div');
                bubble.classList.add('bubble');
                const size = Math.random() * 100 + 50;
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                bubble.style.left = `${Math.random() * 100}vw`;
                bubble.style.top = `${Math.random() * 100}vh`;
                bubble.style.animationDuration = `${Math.random() * 10 + 8}s`;
                bubble.style.animationDelay = `${Math.random() * 5}s`;
                mainContent.appendChild(bubble);
            }
            
            // Create clouds
            for (let i = 0; i < 5; i++) {
                const cloud = document.createElement('div');
                cloud.classList.add('cloud');
                const width = Math.random() * 200 + 100;
                const height = width / 2;
                cloud.style.width = `${width}px`;
                cloud.style.height = `${height}px`;
                cloud.style.top = `${Math.random() * 70}vh`;
                cloud.style.animationDuration = `${Math.random() * 30 + 20}s`;
                cloud.style.animationDelay = `${Math.random() * 10}s`;
                mainContent.appendChild(cloud);
            }
            
            // Create cute floating emojis
            const emojis = ['🦄', '🌊', '🐬', '💎', '🐳', '🧩', '🌌', '🦋', '❄️', '🐱', '🐰'];
            for (let i = 0; i < 10; i++) {
                const emoji = document.createElement('div');
                emoji.classList.add('floating-emoji');
                emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.left = `${Math.random() * 100}vw`;
                emoji.style.top = `${Math.random() * 100}vh`;
                emoji.style.animationDuration = `${Math.random() * 8 + 5}s`;
                emoji.style.animationDelay = `${Math.random() * 5}s`;
                mainContent.appendChild(emoji);
            }
        }

        // Create falling hearts and stars
        function createFallingElements() {
            // Create hearts and stars
            setInterval(() => {
                const element = document.createElement('div');
                element.className = Math.random() > 0.5 ? 'heart' : 'star';
                element.innerText = Math.random() > 0.5 ? '💙' : '✨';
                element.style.left = Math.random() * 100 + 'vw';
                element.style.animationDuration = Math.random() * 5 + 3 + 's';
                document.body.appendChild(element);

                // Remove element after animation
                setTimeout(() => {
                    element.remove();
                }, 8000);
            }, 400);
        }

        // Add 3D tilt effect to card
        function addTiltEffect() {
            profileCard.addEventListener('mousemove', (e) => {
                const rect = profileCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const tiltX = (y - centerY) / 15;
                const tiltY = (centerX - x) / 15;
                
                profileCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
            });
            
            profileCard.addEventListener('mouseleave', () => {
                profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                profileCard.style.transition = 'transform 0.5s ease';
            });
            
            profileCard.addEventListener('mouseenter', () => {
                profileCard.style.transition = 'transform 0.1s ease';
            });
        }

        // Launch website function
        playButton.addEventListener('click', () => {
            // Update loading text
            document.getElementById('loading-text').textContent = "Launching...";
            
            // Play the launch sound
            launchSound.volume = 0.7;
            launchSound.play().catch(error => console.error('Launch sound playback error:', error));
            
            // Add some fake loading time for effect
            setTimeout(() => {
                // Hide loading page with animation
                loadingPage.style.opacity = '0';
                loadingPage.style.transform = 'translateY(-20px)';
                
                // Change body background
                document.body.style.backgroundColor = '#bbdefb';
                
                // After animation completes, show main content
                setTimeout(() => {
                    loadingPage.style.display = 'none';
                    mainContent.style.display = 'block';
                    
                    // Create background elements
                    createBackgroundElements();
                    
                    // Fade in main content
                    setTimeout(() => {
                        mainContent.style.opacity = '1';
                        
                        // Add effects
                        addTiltEffect();
                        createFallingElements();
                        
                        // Play background music with fade-in effect
                        bgMusic.volume = 0; // Start with volume at 0
                        bgMusic.play().catch(error => console.error('Background music playback error:', error));
                        
                        // Fade in the volume
                        let volume = 0;
                        const fadeInterval = setInterval(() => {
                            if (volume < 0.7) {
                                volume += 0.01;
                                bgMusic.volume = volume;
                            } else {
                                clearInterval(fadeInterval);
                            }
                        }, 100);
                    }, 100);
                }, 1500);
            }, 2000);
        });