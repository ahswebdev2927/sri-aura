/* ----------------------------------------------------
   SRI AURA WELLNESS - INTERACTIVE APPLICATION SCRIPT
   ---------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. STICKY NAVBAR & BACK-TO-TOP TRIGGER
    // ==========================================
    const header = document.getElementById('mainHeader');
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        // Sticky Header scroll class
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (window.scrollY > 400) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });


    // ==========================================
    // 2. MOBILE MENU SLIDE-OUT TOGGLE
    // ==========================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const menuIcon = mobileToggle.querySelector('i');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        
        // Toggle icon between bars and cross
        if (navMenu.classList.contains('open')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        } else {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        });
    });


    // ==========================================
    // 3. ABOUT PAGE TESTIMONIAL SLIDER
    // ==========================================
    const aboutPrevBtn = document.getElementById('aboutSliderPrev');
    const aboutNextBtn = document.getElementById('aboutSliderNext');
    const aboutSlides = document.querySelectorAll('.testimonial-about-slide');
    
    if (aboutPrevBtn && aboutNextBtn && aboutSlides.length > 0) {
        let currentAboutSlide = 0;
        
        function showAboutSlide(index) {
            aboutSlides.forEach(slide => slide.classList.remove('active'));
            aboutSlides[index].classList.add('active');
            currentAboutSlide = index;
        }
        
        aboutPrevBtn.addEventListener('click', () => {
            let prevIndex = (currentAboutSlide - 1 + aboutSlides.length) % aboutSlides.length;
            showAboutSlide(prevIndex);
        });
        
        aboutNextBtn.addEventListener('click', () => {
            let nextIndex = (currentAboutSlide + 1) % aboutSlides.length;
            showAboutSlide(nextIndex);
        });
    }


    // ==========================================
    // 4. FAQ ACCORDION INTERACTIVITY
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const isAlreadyActive = currentItem.classList.contains('active');

            // Collapse all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            // If it wasn't active, expand it
            if (!isAlreadyActive) {
                currentItem.classList.add('active');
            }
        });
    });


    // ==========================================
    // 4. SCROLL FADE-IN ANIMATION (Intersection Observer)
    // ==========================================
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    // Stop observing once animated in
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => scrollObserver.observe(el));
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => el.classList.add('appear'));
    }


    // ==========================================
    // 5. ACTIVE NAVIGATION LINK ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust calculation point for header offset
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    // ==========================================
    // 6. SERVICES INTERACTIVE PRICING ENGINE
    // ==========================================
    const searchInput = document.getElementById('pricingSearchInput');
    const tabsTrack = document.getElementById('pricingTabsTrack');
    const pillsRow = document.getElementById('subcategoryPills');
    const resultsContainer = document.getElementById('pricingResults');
    
    const tabScrollPrev = document.getElementById('tabScrollPrev');
    const tabScrollNext = document.getElementById('tabScrollNext');

    // Services Database
    const pricingDb = {
        men: {
            subcategories: ["Hair Cut", "Hair Coloring", "Hair Wash", "Head Massage", "Hair Treatments", "Hair Straightening", "Waxing", "D-Tan"],
            services: [
                { name: "Hair Cut", category: "Hair Cut", price: 300, desc: "Shampoo + Style + Massage" },
                { name: "Kids Cut (Below 10 Years)", category: "Hair Cut", price: 200, desc: "Styling for young gents" },
                { name: "Shaving / Beard Trim", category: "Hair Cut", price: 100, desc: "Classic shaving or styling" },
                { name: "Beard Design", category: "Hair Cut", price: 150, desc: "Detailed styling and trim" },
                { name: "Global Hair Coloring", category: "Hair Coloring", price: 600, desc: "Ammonia-free global color" },
                { name: "Hair Highlights", category: "Hair Coloring", price: 1000, desc: "Streaks coloring" },
                { name: "Luxury Hair Wash", category: "Hair Wash", price: 150, desc: "Includes conditioning and blow dry" },
                { name: "Organic Head Massage", category: "Head Massage", duration: "20 min", price: 250, desc: "With warm coconut oil" },
                { name: "Anti-Dandruff Treatment", category: "Hair Treatments", price: 800, desc: "Removes scalp build-up" },
                { name: "Hair Straightening", category: "Hair Straightening", price: 2500, desc: "Permanent sleek look" },
                { name: "Full Face Waxing", category: "Waxing", price: 300, desc: "Gentle wax hair removal" },
                { name: "De-Tan Treatment", category: "D-Tan", price: 400, desc: "Brightening tan removal pack" }
            ]
        },
        women: {
            subcategories: ["Hair Cut & Styling", "Hair Coloring", "Hair Wash", "Head Massage", "Highlights / Streaking", "Hair Treatments", "Keratin Treatment"],
            services: [
                { name: "Haircut + Wash + Setting", category: "Hair Cut & Styling", price: 950, desc: "Complete professional hair trim and styling" },
                { name: "Creative Cut", category: "Hair Cut & Styling", price: 1200, desc: "Custom style by senior hair designer" },
                { name: "Advance Blow Dry", category: "Hair Cut & Styling", price: 500, desc: "Volume boost and setting" },
                { name: "Happy Child (Below 12 Years)", category: "Hair Cut & Styling", price: 400, desc: "Kid-friendly trim" },
                { name: "Hairstyling", category: "Hair Cut & Styling", price: "2000+", desc: "Premium styling for special events" },
                { name: "Global Coloring", category: "Hair Coloring", price: 2500, desc: "Rich ammonia-free global color" },
                { name: "Luxury Hair Wash", category: "Hair Wash", price: 200, desc: "Nourishing shampoo and conditioning" },
                { name: "Relaxing Head Massage", category: "Head Massage", duration: "25 min", price: 300, desc: "With essential oils" },
                { name: "Premium Streaks / Highlights", category: "Highlights / Streaking", price: 3000, desc: "Stunning fashion shades" },
                { name: "Anti-Frizz Treatment", category: "Hair Treatments", price: 1500, desc: "Smoothes cuticles" },
                { name: "Keratin Smooth Therapy", category: "Keratin Treatment", price: 4000, desc: "Keratin protein restructuring" }
            ]
        },
        facials: {
            subcategories: ["Basic Facials", "Premium Facials", "Advanced Facials", "Tan Packs"],
            services: [
                { name: "Fruit Hydrating Facial", category: "Basic Facials", price: 1200, desc: "Rich fruit pack for deep hydration" },
                { name: "Sri Aura Golden Glow Facial", category: "Premium Facials", price: 1800, desc: "Luxury facial with 24k gold extracts for radiant glow" },
                { name: "Anti-Aging Herbal Facial", category: "Advanced Facials", price: 2200, desc: "Active collagen serum and facial massage" },
                { name: "Deep Cleansing Detan Pack", category: "Tan Packs", price: 1500, desc: "Cleanses pores and removes sun tan" }
            ]
        },
        beauty: {
            subcategories: ["Beauty Essentials", "Rica Wax", "Fruit Wax", "Brazilian Wax", "Manicure", "Pedicure", "Tan Packs"],
            services: [
                { name: "Threading", category: "Beauty Essentials", price: 50, desc: "Facial hair threading" },
                { name: "Eyebrows", category: "Beauty Essentials", price: 50, desc: "Eyebrow threading shaping" },
                { name: "Upper Lip", category: "Beauty Essentials", price: 50, desc: "Upper lip threading" },
                { name: "Chin", category: "Beauty Essentials", price: 40, desc: "Chin threading" },
                { name: "Forehead", category: "Beauty Essentials", price: 40, desc: "Forehead threading" },
                { name: "Full Face", category: "Beauty Essentials", price: 250, desc: "Full face threading" },
                { name: "Rica Wax Full Arms", category: "Rica Wax", price: 400, desc: "Italian Rica wax treatment" },
                { name: "Fruit Wax Full Arms", category: "Fruit Wax", price: 350, desc: "Refreshing fruit wax treatment" },
                { name: "Brazilian Wax", category: "Brazilian Wax", price: 1200, desc: "Gentle waxing service" },
                { name: "Luxury Manicure", category: "Manicure", price: 600, desc: "Nail trim, filing, massage" },
                { name: "Luxury Pedicure", category: "Pedicure", price: 800, desc: "Soothing foot scrub and soak" },
                { name: "De-Tan Facial Pack", category: "Tan Packs", price: 500, desc: "Instantly removes sun tan" }
            ]
        },
        body: {
            subcategories: ["Body Massages", "Foot Therapy", "Body Treatments", "Spa Packages"],
            services: [
                // Body Massages
                { name: "Swedish Massage", category: "Body Massages", duration: "60 min", price: 1999, desc: "Gentle full body relaxation massage" },
                { name: "Swedish Massage", category: "Body Massages", duration: "90 min", price: 2799, desc: "Gentle full body relaxation massage" },
                { name: "Deep Tissue Massage", category: "Body Massages", duration: "60 min", price: 2499, desc: "Muscle tension relief massage" },
                { name: "Deep Tissue Massage", category: "Body Massages", duration: "90 min", price: 3299, desc: "Muscle tension relief massage" },
                { name: "Balinese Massage", category: "Body Massages", duration: "60 min", price: 2299, desc: "Traditional gentle stretching & acupressure" },
                { name: "Balinese Massage", category: "Body Massages", duration: "90 min", price: 3099, desc: "Traditional gentle stretching & acupressure" },
                { name: "Aroma Therapy Massage", category: "Body Massages", duration: "60 min", price: 2299, desc: "Balancing massage with essential aroma oils" },
                { name: "Aroma Therapy Massage", category: "Body Massages", duration: "90 min", price: 3099, desc: "Balancing massage with essential aroma oils" },
                // Foot Therapy
                { name: "Foot Reflexology", category: "Foot Therapy", duration: "30 min", price: 999, desc: "Soothing pressure point foot massage" },
                { name: "Foot Reflexology", category: "Foot Therapy", duration: "60 min", price: 1699, desc: "Soothing pressure point foot massage" },
                // Body Treatments
                { name: "Body Scrub", category: "Body Treatments", duration: "45 min", price: 1499, desc: "Exfoliating salt body scrub" },
                { name: "Body Polish", category: "Body Treatments", duration: "60 min", price: 2499, desc: "Nourishing and hydrating body polish" },
                { name: "Body Wrap", category: "Body Treatments", duration: "60 min", price: 2799, desc: "Moisturizing and detoxifying body wrap" },
                // Spa Packages
                { name: "Relax Package (Massage + Foot Therapy)", category: "Spa Packages", duration: "90 min", price: 2999, desc: "Therapeutic massage combined with foot reflexology" },
                { name: "Signature Spa Package", category: "Spa Packages", duration: "120 min", price: 4499, desc: "Premium signature spa rejuvenation therapy" },
                { name: "Royal Luxury Package", category: "Spa Packages", duration: "180 min", price: 6999, desc: "Ultimate royal full-body luxury pampering session" }
            ]
        },
        makeup: {
            subcategories: ["Bridal", "Party", "Reception", "Groom"],
            services: [
                { name: "Luxury Bridal Makeup", category: "Bridal", price: 15000, desc: "Includes hairstyling, draping, and HD makeup" },
                { name: "Glam Party Makeup", category: "Party", price: 4000, desc: "Custom makeup for events" },
                { name: "Reception Makeup Session", category: "Reception", price: 8000, desc: "Glamorous reception look" },
                { name: "Groom Grooming & Makeup", category: "Groom", price: 5000, desc: "Natural camera-ready groom look" }
            ]
        },
        packages: {
            subcategories: ["Bridal Combo", "Luxury Spa Packages", "Weekend Salon Combo"],
            services: [
                { name: "Relax Package (Massage + Foot Therapy)", category: "Luxury Spa Packages", duration: "90 min", price: 2999, desc: "Therapeutic massage combined with foot reflexology" },
                { name: "Signature Spa Package", category: "Luxury Spa Packages", duration: "120 min", price: 4499, desc: "Premium signature spa rejuvenation therapy" },
                { name: "Royal Luxury Package", category: "Luxury Spa Packages", duration: "180 min", price: 6999, desc: "Ultimate royal full-body luxury pampering session" },
                { name: "Bridal Wellness Glow Package", category: "Bridal Combo", price: 8000, desc: "Gold facial + body scrub + hair spa" },
                { name: "Weekend Revitalizing Combo", category: "Weekend Salon Combo", price: 2500, desc: "Haircut + facial + pedicure" }
            ]
        },
        memberships: {
            subcategories: ["Wellness Passes", "Salon Passes"],
            services: [
                { name: "Gold Wellness Pass (6 Months)", category: "Wellness Passes", price: 5000, desc: "20% off all spa & salon services + 2 complimentary massages" },
                { name: "Platinum Wellness Pass (12 Months)", category: "Wellness Passes", price: 9000, desc: "25% off all services + 4 complimentary massages" },
                { name: "Annual Luxury Salon Pass", category: "Salon Passes", price: 12000, desc: "30% off all haircuts & styling + unlimited wash & blow-dry" }
            ]
        }
    };

    if (resultsContainer) {
        let activeCategory = "men";
        let activeSubcategory = "";

        // Initial setup
        initPricing();

        function initPricing() {
            renderSubcategories(activeCategory);
            renderResults();
        }

        // 1. Render Subcategory pills
        function renderSubcategories(category) {
            pillsRow.innerHTML = "";
            const subcats = pricingDb[category].subcategories;
            activeSubcategory = subcats[0]; // Set first as default active

            subcats.forEach((sub, index) => {
                const button = document.createElement('button');
                button.className = `sub-pill ${index === 0 ? 'active' : ''}`;
                button.textContent = sub;
                button.setAttribute('data-sub', sub);
                
                button.addEventListener('click', () => {
                    document.querySelectorAll('.sub-pill').forEach(p => p.classList.remove('active'));
                    button.classList.add('active');
                    activeSubcategory = sub;
                    
                    // Clear search on pill navigation to prevent overlap
                    if (searchInput.value.trim() !== "") {
                        searchInput.value = "";
                    }
                    renderResults();
                });
                
                pillsRow.appendChild(button);
            });
        }

        // 2. Render filtered results
        function renderResults() {
            resultsContainer.innerHTML = "";
            const query = searchInput.value.trim().toLowerCase();
            let matches = [];

            if (query !== "") {
                // Global search across all categories
                Object.keys(pricingDb).forEach(catKey => {
                    pricingDb[catKey].services.forEach(service => {
                        if (service.name.toLowerCase().includes(query) || service.desc.toLowerCase().includes(query)) {
                            matches.push(service);
                        }
                    });
                });
            } else {
                // Category + Subcategory filtering
                matches = pricingDb[activeCategory].services.filter(service => service.category === activeSubcategory);
            }

            // Render matching rows
            if (matches.length > 0) {
                matches.forEach(item => {
                    const row = document.createElement('div');
                    row.className = "price-result-row";
                    
                    const waText = encodeURIComponent(`Hi Sri Aura Wellness, I want to book the service: ${item.name} (Price: ₹${item.price}).`);
                    
                    const durationText = item.duration ? ` (${item.duration})` : '';
                    row.innerHTML = `
                        <div class="result-title-wrapper">
                            <h4 class="result-title">${item.name}${durationText}</h4>
                            <div class="result-leader"></div>
                        </div>
                        <div class="price-book-group">
                            <span class="result-price">₹${item.price}</span>
                            <a href="https://wa.me/919966005331?text=${waText}" target="_blank" class="btn-book-pricing-whatsapp" aria-label="Book ${item.name} via WhatsApp">
                                <i class="fa-brands fa-whatsapp"></i>
                            </a>
                        </div>
                    `;
                    resultsContainer.appendChild(row);
                });
            } else {
                resultsContainer.innerHTML = `<div class="no-results-msg">No services found matching your criteria.</div>`;
            }
        }

        // 3. Category Tab Clicking
        const tabBtns = document.querySelectorAll('.pricing-tab');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.getAttribute('data-category');
                
                // Reset search
                searchInput.value = "";
                
                // Reload subcategories and results
                renderSubcategories(activeCategory);
                renderResults();
            });
        });

        // 4. Live Search Input
        searchInput.addEventListener('input', () => {
            renderResults();
        });

        // 5. Custom scrollbar & arrow listeners
        const scrollThumb = document.getElementById('tabScrollThumb');

        function updateScrollIndicator() {
            if (!tabsTrack || !scrollThumb) return;
            const maxScrollLeft = tabsTrack.scrollWidth - tabsTrack.clientWidth;
            const scrollPercentage = maxScrollLeft > 0 ? tabsTrack.scrollLeft / maxScrollLeft : 0;
            const thumbWidth = parseFloat(scrollThumb.style.width) || 20;
            const maxLeftPercentage = 100 - thumbWidth;
            scrollThumb.style.left = (scrollPercentage * maxLeftPercentage) + '%';
        }

        function updateThumbWidth() {
            if (!tabsTrack || !scrollThumb) return;
            const visibleRatio = tabsTrack.clientWidth / tabsTrack.scrollWidth;
            const thumbWidthPercentage = Math.max(visibleRatio * 100, 20); // Min 20% width
            scrollThumb.style.width = thumbWidthPercentage + '%';
        }

        if (tabsTrack) {
            tabsTrack.addEventListener('scroll', updateScrollIndicator);
            window.addEventListener('resize', () => {
                updateThumbWidth();
                updateScrollIndicator();
            });
            // Initial setup delay to ensure width calculations are correct after rendering
            setTimeout(() => {
                updateThumbWidth();
                updateScrollIndicator();
            }, 150);
        }

        if (tabScrollPrev && tabScrollNext && tabsTrack) {
            tabScrollPrev.addEventListener('click', () => {
                tabsTrack.scrollBy({ left: -150, behavior: 'smooth' });
            });
            tabScrollNext.addEventListener('click', () => {
                tabsTrack.scrollBy({ left: 150, behavior: 'smooth' });
            });
        }
    }

});

