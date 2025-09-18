document.addEventListener("DOMContentLoaded", async function() {
    // Diccionario de precios 
    const pricesUSD = {
        'basic-price': '$ 2,400',
        'standar-price': '$ 6,800',
        'continuous-plan': '$ 7,800 /month',
        'project-assesment': '$ 3,600 /sample',
        'example-production': '$ 3,600 /colection',
        'training-student': '$ 500 /student',
        'training-group': '$ 2,400 /group'
    };

    // Idioma de paǵina según la definición de lang. 
    // Se usará para determinar el idioma de los sufijos que acompañan a los precios
    const pageLang = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'es';

    // Lista de países europeos (simplificada)
    const europeanCountries = [
        "ES","PT","FR","DE","IT","NL","BE","LU","AT","IE","FI","SE","NO","DK",
        "PL","CZ","HU","GR","RO","BG","HR","SI","SK","EE","LV","LT","MT","CY"
    ];

    // Función para decidir si usar dólare$ o €uros
    async function shouldUseUSD() {
        try {
            // Llamada API externa
            const res = await fetch("https://ipapi.co/json/");
            const data = await res.json();
            if (!europeanCountries.includes(data.country)) {
                return true; // Devuelve true si no es una zona Euro
            }
        } catch (e) {
            console.warn("Can't detect country by IP:", e);
            // Fallback: idioma navegador
            const userLang = navigator.language || navigator.userLanguage;
            const langPrefix = userLang.toLowerCase().split('-')[0];
            const usdLanguages = ['en', 'us', 'gb', 'au', 'ca'];
            if (usdLanguages.includes(langPrefix)) return true;
        }
        return false; // Por defecto EUR
    }

    // Cambiar precios
    if (await shouldUseUSD()) {
        Object.keys(pricesUSD).forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                let price = pricesUSD[id];

                // Adaptar textos según idioma de página
                // =====================================
                if(price.includes('/mes') || price.includes('/month')) {
                    price = price.replace(/\/mes|\/month/, pageLang === 'en' ? '/month' : '/mes');
                }
                if(price.includes('/muestra') || price.includes('/sample')) {
                    price = price.replace(/\/muestra|\/sample/, pageLang === 'en' ? '/sample' : '/muestra');
                }
                if(price.includes('/colección') || price.includes('/colection')) {
                    price = price.replace(/\/colección|\/colection/, pageLang === 'en' ? '/colection' : '/colección');
                }
                if(price.includes('/alumno') || price.includes('/student')) {
                    price = price.replace(/\/alumno|\/student/, pageLang === 'en' ? '/student' : '/alumno');
                }
                if(price.includes('/grupo') || price.includes('/group')) {
                    price = price.replace(/\/grupo|\/group/, pageLang === 'en' ? '/group' : '/grupo');
                }
                // =====================================

                // Actualizar contenido
                el.firstChild.textContent = price;
                el.value = price;

                // Determina si se debe traducir el texto que acompaña al precio por grupos del panel "Formación Equipos"
                const small = el.querySelector('small');
                if(small) {
                    small.textContent = pageLang === 'en' ? '(Up to 8 students)' : '(Hasta 8 alumnos)';
                }
            }
        });
    }
});

