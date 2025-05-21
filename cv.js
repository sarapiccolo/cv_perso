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
        title: "La Cybersécurité dans le développement web",
        theme: "Cybersécurité",
        tags: [""],
        subDescription: "",
        sources: [
          {
            title: "digital guide",
            url: "https://www.ionos.fr/digitalguide/",
            date: "avril 2024"
            
        },
            {
                title: "google alert",
                url: "https://www.google.fr/alerts#1:8",
                date: "avril 2024"
                
            },

            {
              title: "ANSSI",
              url: "https://cyber.gouv.fr",
              date: "avril 2024"
              
          },

          {
            title: "Le journal du Hacker",
            url: "https://www.journalduhacker.net",
            date: "avril 2024"
            
        },

          
        ],
        fullArticle: `<p>J’ai choisi de faire ma veille technologique sur la cybersécurité dans le développement web. 
        Ce sujet est important dans le monde du developpement car, en tant qu'une des programmeuse de Fast Sushi,  il fallait 
        le protégées contre les piratages et les failles de sécurité.</p></br>
        <p>Pour suivre l’actualité sur ce sujet, j’ai utilisé ces outils :
          <li>Google Alerts</li>
          <li>OWASP.org</li>
          <li>Reseau Sociaux Pro: Linkedin</li> 
          <li>ANSSI</li> </br>
          <p>Grâce à cette veille :
        Je sais maintenant qu’il faut penser à la sécurité dès le début d’un projet.
        J’ai découvert l’OWASP Top 10 et appris à éviter les principales failles.
        J’ai utilisé des outils bcrypt pour sécuriser mes projets.
        Je comprends mieux comment protéger les données des utilisateurs.</p></br>
        <p>Cette veille m’a été très utile pour améliorer la sécurité de mes projets web. À l’avenir, 
        je veux continuer à me former sur ces sujets, notamment avec des outils d’analyse de sécurité ou de test de vulnérabilités.</p> `
    }
];

const projectsData = [
    {
        id: 1,
        title: "Fast Sushi",
        type: "Site Web",
        date: "Février 2024",
        technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        description: "",
        html: `<p>Site web développé pour un restaurant de sushi fictif, permettant de consulter le menu, passer commande en ligne et réserver une table. 
        Interface responsive adaptée pour les mobiles et les tablettes.</p>
        <br><p>Nous avons travaillé en mode projet pour ce projet à l'aide d'un trello</p></br>
        <br>[img:./imagecv/trello.png]</br>
        <p>Nous avons fait le client lourd avec le framwork Laravel</p>
        <br>[img:./imagecv/fastsushi1.png]</br>
        <br>[img:./imagecv/fastsuhi2.png]</br>
    

        
        <h3>Compétences développés</h3><br>
        <li>Mettre à disposition des utilisateurs à un service informatique</li>
        <li>Répondre aux incidents et aux demandes d'assistances et d'évolutions</li></br>`,
        technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        images: [
           ,

            
        ],
        link: ""
    },
    {
        id: 2,
        title: " DERCO OI ",
        type: "Incident Reseau",
        date: "Mars 2024",
        description: "",
        html: `<p>Un DERCO OI est un dérangement collectif impliquant plusieurs clients en panne, où Orange est opérateur 
        d'infrastructure. C’est à travers plusieurs processus et automates que les pilotes d'activités peuvent suivre, 
        récupérer et renseigner les 
        informations nécessaires au traitement des dommages réseau, tout en intégrant la notion de priorité.</p></br>
               <p>Lorsque les opérateurs tiers (OC) déclarent un DERCO OI, un processus de vérification préalable est effectué par les automates.
               Une fois cette étape validée, un ticket "père" est disponible sur Océane, une application du système d'information destinée aux pilotes d'activités.</p>
               </br>[img:./imagecv/dc1.png]<br>
               <p>Ticket Fils </br>
               </br>[img:./imagecv/DC7.png]<br>
               <p>Informations transmises par les automates</p>
               </br>[img:./imagecv/dc2.png]<br>
               </br>[img:./imagecv/DC6.png]<br>
               <p>Création d'intervention par l'automate avec numéro de référence</p>
               </br>[img:./imagecv/DC3.png]<br>
               <p>Affectation soit par l'automate dans l'ilot des fournisseurs C15 soit en interne si priorité 1 aux equipes Orange</p>
               </br>[img:./imagecv/DC4.png]<br>
               <p>Quand l'intervention est cloturé, les informations sont remontés dans le ticket</p>
               </br>[img:./imagecv/DC5.png]<br>
              <br><h3>Compétences développés</h3>
               <br><li>Gérer le patrimoine informatique</li><li>Répondre aux incidents et aux demandes d'assistances et d'évolutions</li>
               </br>`,
        technologies: [],
        link: "imagecv/ProcessDCOIOC.png"
    },
    {
        id: 3,
        title: "Test Orchestra",
        type: "Application",
        date: "Janvier 2024",
        description: "",
        html: `<p>Application Système de Tests et de diagnostic de ligne</p>
        <br><p>Il est possible que nous sommes solicité par la Cellule Expertise Client Orange pour des Cas particulier
        de clients en panne.</p></br>
        <br>[img:./imagecv/TO1.png]</br>
        <p>On va donc regardé l'état de la ligne du client</p>
        <br>[img:./imagecv/TO2.jpeg]</br>
        <p>On crée une intervention "Signalisation Unitaire" afin que le client soit réparé </p>
        <br>[img:./imagecv/TO3.png]</br>
        <p>lors de la cloture, nous allons vérifié la ligne à nouveau </p>
        <br>[img:./imagecv/TO4.png]</br>

        
        <h3>Compétences développés</h3><br>
        <li>Mettre à disposition des utilisateurs à un service informatique</li>
        <li>Répondre aux incidents et aux demandes d'assistances et d'évolutions</li></br>`,
        technologies: [],

        link: "#"
    },
    {
        id: 4,
        title: "GESTAR",
        type: "Application",
        date: "Avril 2024",
        description: "Redesign de l'interface utilisateur du système GESTAR utilisé par les équipes d'Orange. Travail sur l'ergonomie, l'accessibilité et la cohérence visuelle pour améliorer l'expérience utilisateur des collaborateurs.",
        html: `<p>Gerer les dommages aux reseaux orange via plusieurs applicatifs</p>
        <br><p>Suite à un appel client via un technicien, voici comment un GESTAR se présente, sous forme de ticket avec la nature de l'intervention et quel dommage au reseau.</p></br>
        <br>[img:./imagecv/gestar.png]<br>
        <p>Ensuite, nous créons une intervetion afin que l'expert puisse constater le dommage et à qui est la responsabilité</p>
        <p>[img:imagecv/ocapi.png]<p><br>
        <p>Mail en complément d'information pour l'expert</p>
         <br>[img:./imagecv/GESTAR1.png]<br>
         <p>Puis le retour de l'expert</p>
         <br>[img:./imagecv/GESTAR2.png]<br>
        <h3>Compétences développés</h3><br>
        <li>Mettre à disposition des utilisateurs un service informatique</li></br>`,
        technologies: [],
        
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
            detailDescription.innerHTML = project.html.replace(/\[img:([^\]]+)\]/g, '<div class="detail-image"><img src="$1" alt="Image"></div>');
            techList.innerHTML = project.technologies.map(tech => `<li>${tech}</li>`).join('');
            detailImages.innerHTML = '';
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