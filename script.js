// async function loadProgetti() {
//     const grid = document.querySelector('.grid');
//     if (!grid) return;
    
//     grid.innerHTML = '';
    
//     const progettiFiles = ['progetto1.json', 'progetto2.json'];
    
//     for (const file of progettiFiles) {
//         try {
//             const response = await fetch(`data/progetti/${file}`);
//             const progetto = await response.json();
            
//             grid.innerHTML += `
//                 <div class="card">
//                     <img src="${progetto.main_image}" alt="${progetto.title}" loading="lazy">
//                     <h3>${progetto.title}</h3>
//                     <p>${progetto.description}</p>
//                 </div>
//             `;
//         } catch(e) {
//             console.log(`Errore caricamento ${file}:`, e);
//         }
//     }
// }

// document.addEventListener('DOMContentLoaded', loadProgetti);

// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
//     });
// });

// document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
//     e.preventDefault();
//     alert('Messaggio inviato! Ti contatteremo presto.');
//     this.reset();
// });



// // async function loadProgetti() {
// //     const grid = document.querySelector('.grid');
// //     if (!grid) return;
    
// //     grid.innerHTML = '<p>Caricamento progetti...</p>';
    
// //     const progettiFiles = ['progetto1.json', 'progetto2.json'];
// //     const progetti = [];
    
// //     for (const file of progettiFiles) {
// //         try {
// //             const response = await fetch(`data/progetti/${file}`);
            
// //             if (!response.ok) {
// //                 throw new Error(`HTTP ${response.status}: ${file} non trovato`);
// //             }
            
// //             const progetto = await response.json();
// //             progetti.push(progetto);
// //             console.log(`✅ Caricato: ${progetto.title}`);
            
// //         } catch(error) {
// //             console.error(`❌ Errore ${file}:`, error);
// //         }
// //     }
    
// //     // Renderizza tutti insieme
// //     grid.innerHTML = '';
// //     progetti.forEach(progetto => {
// //         grid.innerHTML += `
// //             <div class="card">
// //                 <img src="${progetto.main_image}" alt="${progetto.title}" onerror="this.src='img/placeholder.jpg'">
// //                 <h3>${progetto.title}</h3>
// //                 <p>${progetto.description}</p>
// //             </div>
// //         `;
// //     });
    
// //     console.log(`📊 Totale progetti caricati: ${progetti.length}`);
// // }

// // document.addEventListener('DOMContentLoaded', loadProgetti);

// // // Smooth scroll
// // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
// //     anchor.addEventListener('click', function (e) {
// //         e.preventDefault();
// //         document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
// //     });
// // });

// // // Form
// // document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
// //     e.preventDefault();
// //     alert('Messaggio inviato!');
// //     this.reset();
// // });



async function loadProgetti() {
    const grid = document.querySelector('.grid');
    if (!grid) return;
    
    grid.innerHTML = '<p>Caricamento progetti...</p>';
    
    let progetti = [];
    
    // 1. Carica da localStorage (admin)
    const stored = localStorage.getItem('carpenteria_progetti');
    if (stored) {
        progetti = JSON.parse(stored);
        console.log(`📦 Caricati ${progetti.length} progetti da localStorage`);
    }
    
    // 2. Fallback: carica da JSON files
    if (progetti.length === 0) {
        const progettiFiles = ['progetto1.json', 'progetto2.json'];
        
        for (const file of progettiFiles) {
            try {
                const response = await fetch(`data/progetti/${file}`);
                if (response.ok) {
                    const progetto = await response.json();
                    progetti.push(progetto);
                    console.log(`✅ Caricato: ${progetto.title}`);
                }
            } catch(error) {
                console.error(`❌ Errore ${file}:`, error);
            }
        }
    }
    
    // Renderizza
    grid.innerHTML = '';
    if (progetti.length === 0) {
        grid.innerHTML = '<p>Nessun progetto disponibile.</p>';
        return;
    }
    
    progetti.forEach(progetto => {
        grid.innerHTML += `
            <div class="card">
                <img src="${progetto.main_image}" alt="${progetto.title}" loading="lazy">
                <h3>${progetto.title}</h3>
                <p>${progetto.description}</p>
            </div>
        `;
    });
    
    console.log(`📊 Totale progetti visualizzati: ${progetti.length}`);
}

document.addEventListener('DOMContentLoaded', loadProgetti);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Form
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Messaggio inviato!');
    this.reset();
});
