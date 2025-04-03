// JavaScript pour le fonctionnement des boutons de filtrage
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const formationsColumn = document.querySelector('.formations-column');
    const experiencesColumn = document.querySelector('.experiences-column');
    
    // Fonction pour gérer le filtrage
    function filterParcours(target) {
      if (target === 'all') {
        formationsColumn.style.display = 'block';
        experiencesColumn.style.display = 'block';
      } else if (target === 'formations') {
        formationsColumn.style.display = 'block';
        experiencesColumn.style.display = 'none';
      } else if (target === 'experiences') {
        formationsColumn.style.display = 'none';
        experiencesColumn.style.display = 'block';
      }

      // Réinitialiser et appliquer l'animation des éléments de timeline
      setTimeout(() => {
        animateTimelineItems();
      }, 100);
    }
    
    // Ajouter les écouteurs d'événements aux boutons
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Supprimer la classe active de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Ajouter la classe active au bouton cliqué
        this.classList.add('active');
        
        // Filtrer le contenu en fonction du bouton cliqué
        const target = this.getAttribute('data-target');
        filterParcours(target);
      });
    });

    // Animation de défilement lisse pour les liens de navigation
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Empêcher le comportement par défaut
        e.preventDefault();
        
        // Obtenir l'ID de la section cible
        const targetId = this.getAttribute('href');
        
        // Calculer la position de la section
        const targetSection = document.querySelector(targetId);
        const targetPosition = targetSection.offsetTop - 80; // Soustraire la hauteur du header
        
        // Animation de défilement avec une fonction d'accélération personnalisée
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Fermer le menu mobile si ouvert
        if (window.innerWidth <= 768) {
          document.getElementById('navMenu').classList.remove('active');
          document.getElementById('menuButton').classList.remove('active');
        }
      });
    });

    // Animation d'apparition des sections au défilement
    const sections = document.querySelectorAll('section');
    
    function fadeInOnScroll() {
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
          section.classList.add('fade-in');
          
          // Si c'est la section parcours, animer les éléments de timeline
          if (section.id === 'parcours') {
            animateTimelineItems();
          }
        }
      });
    }
    
    // Fonction pour animer les éléments de timeline séquentiellement
    function animateTimelineItems() {
      const timelineItems = document.querySelectorAll('.timeline-item:not(.animated)');
      
      timelineItems.forEach((item, index) => {
        // Réinitialiser les animations
        item.classList.remove('animated');
        item.style.transitionDelay = '0s';
        
        // Appliquer l'animation avec un délai croissant
        setTimeout(() => {
          item.style.transitionDelay = (index * 0.15) + 's';
          item.classList.add('animated');
        }, 50);
      });
    }
    
    // Appliquer l'animation au chargement initial
    window.addEventListener('load', fadeInOnScroll);
    
    // Appliquer l'animation au défilement
    window.addEventListener('scroll', fadeInOnScroll);
    
    // Animation du chevron
    const chevron = document.querySelector('.chevron-down');
    if (chevron) {
      chevron.addEventListener('click', () => {
        const accueilSection = document.getElementById('accueil');
        window.scrollTo({
          top: accueilSection.offsetTop - 80,
          behavior: 'smooth'
        });
      });
    }

    // Certification image links
    const certifLinks = document.querySelectorAll('.certif-link');
    
    certifLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const certifImage = this.closest('.certif-item').querySelector('.certif').src;
            window.open(certifImage, '_blank');
        });
    });

    // Populate Veille Technologique section
    const veilleContainer = document.querySelector('.veille-container');
    
    if (veilleContainer) {
        veilleData.forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.className = 'veille-article';
            
            articleElement.innerHTML = `
                <h3>${article.title}</h3>
                <div class="veille-metadata">
                    <span class="veille-theme">${article.theme}</span>
                    <div class="veille-tags">
                        ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <p class="veille-subdesc">${article.subDescription}</p>
                <div class="veille-sources">
                    <h4>Sources</h4>
                    <ul>
                        ${article.sources.map(source => `
                            <li>
                                <a href="${source.url}" target="_blank" rel="noopener noreferrer">
                                    ${source.title}
                                </a>
                                <span class="source-date">${source.date}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="veille-full-article collapsed">
                    <div class="article-content">
                        ${article.fullArticle.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
                    </div>
                </div>
                <button class="expand-article">Lire plus</button>
            `;
            
            veilleContainer.appendChild(articleElement);

            // Add expand/collapse functionality
            const expandBtn = articleElement.querySelector('.expand-article');
            const fullArticle = articleElement.querySelector('.veille-full-article');
            
            expandBtn.addEventListener('click', () => {
                const isCollapsed = fullArticle.classList.contains('collapsed');
                
                if (isCollapsed) {
                    fullArticle.classList.remove('collapsed');
                    expandBtn.textContent = 'Réduire';
                    fullArticle.style.maxHeight = fullArticle.scrollHeight + 'px';
                } else {
                    fullArticle.classList.add('collapsed');
                    expandBtn.textContent = 'Lire plus';
                    fullArticle.style.maxHeight = null;
                }
            });
        });
    }
});

const veilleData = [
    {
        title: "La cybersécurité Zero Trust : Une approche moderne de la sécurité informatique",
        theme: "Cybersécurité",
        tags: ["Zero Trust", "Sécurité", "Architecture", "Cloud"],
        subDescription: "Le modèle Zero Trust révolutionne la sécurité informatique en adoptant le principe de 'ne jamais faire confiance, toujours vérifier', transformant ainsi la manière dont les entreprises protègent leurs ressources numériques.",
        sources: [
            {
                title: "Zero Trust : pourquoi cette approche s'impose en 2024",
                url: "https://www.zdnet.fr/actualites/zero-trust-pourquoi-cette-approche-s-impose-en-2024-39960708.htm",
                date: "Janvier 2024"
            },
            {
                title: "Guide de mise en œuvre du Zero Trust",
                url: "https://www.ssi.gouv.fr/guide/zero-trust-architecture/",
                date: "Décembre 2023"
            },
            {
                title: "Les défis du Zero Trust dans le cloud",
                url: "https://www.journaldunet.com/solutions/dsi/1498889-zero-trust-cloud/",
                date: "Février 2024"
            }
        ],
        fullArticle: `Le modèle de sécurité Zero Trust s'impose comme une réponse incontournable aux défis de cybersécurité actuels. Cette approche, qui repose sur le principe de 'ne jamais faire confiance, toujours vérifier', révolutionne la manière dont les entreprises protègent leurs ressources numériques.

Dans un contexte où le travail hybride devient la norme et où les cyberattaques se multiplient, le Zero Trust offre un cadre de sécurité adapté aux enjeux modernes. Les entreprises adoptent progressivement cette architecture pour plusieurs raisons :

1. Sécurisation du travail à distance
- Authentification continue des utilisateurs
- Contrôle granulaire des accès
- Protection des données sensibles indépendamment de la localisation

2. Adaptation aux environnements cloud
- Intégration native avec les services cloud
- Gestion unifiée des identités
- Sécurisation des workloads cloud

3. Réponse aux nouvelles menaces
- Détection précoce des comportements suspects
- Limitation de l'impact des compromissions
- Réduction de la surface d'attaque

Cette approche représente un changement fondamental dans la manière de concevoir la sécurité informatique, passant d'un modèle de confiance implicite à un modèle de vérification continue.`
    }
];

const projectsData = [
    {
        id: 1,
        title: "Fast Sushi",
        type: "Site Web",
        date: "Février 2024",
        description: "Site web développé pour un restaurant de sushi fictif, permettant de consulter le menu, passer commande en ligne et réserver une table. Interface responsive adaptée pour les mobiles et les tablettes.",
        technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        images: [
            "imagecv/trello.png",
            "imagecv/fastsushi1.png",
            "imagecv/fastsuhi2.png",

            
        ],
        link: "http://localhost:8000"
    },
    {
        id: 2,
        title: "Procédure DERCO",
        type: "Application Mobile",
        date: "Mars 2024",
        description: "Application mobile destinée aux techniciens d'Orange pour suivre les procédures de dépannage sur les réseaux télécom. Intègre un système de checklists et de validation des étapes, avec possibilité de joindre des photos et des commentaires.",
            html: "<p>test de mon paragraphe blabla</p><br>[img:./imagecv/fastsuhi2.png]<br><p>Encore un parapgrahe avec une image test [img:imagecv/trello.png]",
            technologies: ["React Native", "Firebase", "Redux", "API REST"],
        images: [
            "project2-image1.jpg",
            "project2-image2.jpg",
        ],
        link: "#"
    },
    {
        id: 3,
        title: "Pilotage d'Activité",
        type: "Système d'Information",
        date: "Janvier 2024",
        description: "Dashboard de pilotage pour suivre les indicateurs de performance du service réseau d'Orange. Centralise les données de différentes sources et permet de visualiser les tendances et d'identifier rapidement les anomalies.",
        html: "<p>test de mon paragraphe blabla</p><br>[img:./imagecv/fastsuhi2.png]<br><p>Encore un parapgrahe avec une image test [img:imagecv/trello.png]",
        technologies: ["Tableau", "SQL", "PowerBI", "ETL"],
        images: [
            "project3-image1.jpg",
            "project3-image2.jpg",
        ],
        link: "#"
    },
    {
        id: 4,
        title: "GESTAR",
        type: "Design UI/UX",
        date: "Avril 2024",
        description: "Redesign de l'interface utilisateur du système GESTAR utilisé par les équipes d'Orange. Travail sur l'ergonomie, l'accessibilité et la cohérence visuelle pour améliorer l'expérience utilisateur des collaborateurs.",
        html: "<p>test de mon paragraphe blabla</p><br>[img:./imagecv/fastsuhi2.png]<br><p>Encore un parapgrahe avec une image test [img:imagecv/trello.png]",
        technologies: ["Figma", "Adobe XD", "Photoshop", "Design System"],
        images: [
            "project4-image1.jpg",
            "project4-image2.jpg",
        ],
        link: "#"
    }
];

// Sélection des éléments DOM
const projectCards = document.querySelectorAll('.project-card');
const projectDetails = document.getElementById('project-details');
const modalOverlay = document.querySelector('.modal-overlay');
const closeDetailsBtn = document.getElementById('close-details');
const detailTitle = document.getElementById('detail-title');
const detailType = document.getElementById('detail-type');
const detailDate = document.getElementById('detail-date');
const detailDescription = document.getElementById('detail-description');
const techList = document.getElementById('tech-list');
const detailImages = document.getElementById('detail-images');
const detailLink = document.getElementById('detail-link');

// Fonction pour ouvrir les détails d'un projet
function openProjectDetails(projectId) {
    const project = projectsData.find(p => p.id === parseInt(projectId));
    
    if (project) {
        // Remplir les détails du projet
        detailTitle.textContent = project.title;
        detailType.textContent = project.type;
        detailDate.textContent = project.date;

        if(project.html != undefined) {
            detailDescription.innerHTML=project.html.replace(/\[img:([^\]]+)\]/g, '<div class="detail-image"><img src="$1" alt="Image"></div>');
        } else {
            detailDescription.innerHTML = `<p>${project.description}</p>`;
            
            // Remplir les technologies
            techList.innerHTML = project.technologies.map(tech => `<li>${tech}</li>`).join('');
            
            // Remplir les images
            detailImages.innerHTML = project.images.map(image => `
                <div class="detail-image">
                    <img src="${image}" alt="${project.title}" loading="lazy">
                </div>
            `).join('');
        }
        
        // Mettre à jour le lien
        detailLink.href = project.link;
        
        // Afficher les détails
        document.body.style.overflow = 'hidden';
        modalOverlay.classList.add('active');
        projectDetails.classList.remove('hidden');
        requestAnimationFrame(() => {
            projectDetails.classList.add('active');
        });
    }
}

// Fonction pour fermer les détails
function closeProjectDetails() {
    projectDetails.classList.remove('active');
    modalOverlay.classList.remove('active');
    
    setTimeout(() => {
        projectDetails.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

// Ajouter les écouteurs d'événements
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-id');
        openProjectDetails(projectId);
    });
});

closeDetailsBtn.addEventListener('click', closeProjectDetails);
modalOverlay.addEventListener('click', closeProjectDetails);

// Fermer les détails avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !projectDetails.classList.contains('hidden')) {
        closeProjectDetails();
    }
});

// Empêcher la fermeture en cliquant sur le contenu des détails
document.getElementById('details-content').addEventListener('click', (e) => {
    e.stopPropagation();
});