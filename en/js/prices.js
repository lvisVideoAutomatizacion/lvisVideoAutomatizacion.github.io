document.addEventListener("DOMContentLoaded", function() {
    // Lista de idiomas que deberían ver los precios en $
    const usdLanguages = ['en', 'us', 'gb', 'au', 'ca'];

    // Diccionario de precios
    const prices = {
        'eur': {
            'basic-price': '1.920 €',
            'standar-price': '5.760 €',
            'continuous-plan': '7.200 € /mes',
            'project-assesment': '2.400 € /muestra',
            'example-production': '2.400 € /colección',
            'training-student': '400 € /alumno',
            'training-group': '1.800 € /grupo'
        },
        'usd': {
            'basic-price': '$ 2,400',
            'standar-price': '$ 6,800',
            'continuous-plan': '$ 7,800 /month',
            'project-assesment': '$ 3,600 /sample',
            'example-production': '$ 3,600 /colection',
            'training-student': '$ 500 /student',
            'training-group': '$ 2,400 /group'
        }
    };

    // Detectar idioma navegador
    const userLang = navigator.language || navigator.userLanguage;
    const langPrefix = userLang.toLowerCase().split('-')[0];
    const currency = usdLanguages.includes(langPrefix) ? 'usd' : 'eur';

    // Detectar idioma página 
    const pageLang = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'es';

    // Cambiar precios por ID
    Object.keys(prices[currency]).forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            let price = prices[currency][id];

            // =============================================================
            // Adaptar textos detrás del precio según el idioma de la página
            // =============================================================
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
            
            const small = el.querySelector('small');
            if(small) {
                small.textContent = pageLang === 'en' ? '(Up to 8 students)' : '(Hasta 8 alumnos)';
            }
            // =============================================================
            // =============================================================

            // Cambio contenido precio
            el.firstChild.textContent = price;

            // Cambio atributo etiqueta
            el.value = price;
        }
    });
});
