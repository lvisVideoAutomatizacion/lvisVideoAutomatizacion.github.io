document.addEventListener("DOMContentLoaded", function() {
    // Lista básica de países europeos
    const europeanCountries = [
        'es','pt','fr','de','it','nl','be','lu','at','ie','fi','se','no',
        'dk','pl','cz','sk','hu','gr','si','hr','ro','bg','ee','lv','lt',
        'mt','cy','ch','is','li','mc','ad','sm','va','al','rs','me','mk',
        'ba','xk','gl','eu','ca'
    ];

    // Lista regiones España (Galicia, Euskadi y Cataluña)
    const regionCodes = ['ga', 'pv', 'ct'];

    // Diccionario de precios
    const prices = {
        'eur': {
            'basic-price': '1.920 €',
            'standard-price': '5.760 €',
            'continuous-plan': '7.200 € /mes',
            'project-assessment': '2.400 € /muestra',
            'example-production': '2.400 € /colección',
            'training-student': '400 € /alumno',
            'training-group': '1.800 € /grupo'
        },
        'usd': {
            'basic-price': '$ 2,400',
            'standard-price': '$ 6,800',
            'continuous-plan': '$ 7,800 /month',
            'project-assessment': '$ 3,600 /sample',
            'example-production': '$ 3,600 /collection',
            'training-student': '$ 500 /student',
            'training-group': '$ 2,400 /group'
        }
    };

    // Detectar idioma de la página
    const pageLang = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'es';

    // ==============================
    // Función para reemplazar sufijos
    // ==============================
    function adaptSuffixes(priceText, lang) {
        const suffixMap = {
            '/mes': '/month',
            '/muestra': '/sample',
            '/colección': '/collection',
            '/alumno': '/student',
            '/grupo': '/group'
        };

        for (const [esSuffix, enSuffix] of Object.entries(suffixMap)) {
            const regex = new RegExp(`${esSuffix}|${enSuffix}`, 'gi');
            const replacement = lang === 'en' ? enSuffix : esSuffix;
            priceText = priceText.replace(regex, replacement);
        }

        return priceText;
    }

    // ==============================
    // Función para determinar moneda
    // ==============================
    async function getCurrencyByIP() {
        try {
            const res = await fetch("https://ipapi.co/json/");
            if (!res.ok) throw new Error("IP request failed");

            const data = await res.json();

            // Validación de datos
            if (
                !data ||
                typeof data !== 'object' ||
                typeof data.country_code !== 'string' ||
                typeof data.region_code !== 'string'
            ) {
                throw new Error("Datos de IP mal formados");
            }

            const countryCode = data.country_code.toLowerCase();
            const regionCode = data.region_code.toLowerCase();

            return (europeanCountries.includes(countryCode) || regionCodes.includes(regionCode)) ? 'eur' : 'usd';
        } catch (e) {
            console.warn("IP detection failure, fallback to browser language:", e);

            const userLang = navigator.language || navigator.userLanguage;
            const langPrefix = userLang.toLowerCase().split('-')[0];

            return europeanCountries.includes(langPrefix) ? 'eur' : 'usd';
        }
    }

    // ==============================
    // Aplicar precios según moneda
    // ==============================
    getCurrencyByIP().then(currency => {
        Object.entries(prices[currency]).forEach(([id, rawPrice]) => {
            const el = document.getElementById(id);
            if (el) {
                const adaptedPrice = adaptSuffixes(rawPrice, pageLang);

                // Actualizar texto principal
                el.textContent = adaptedPrice;

                // Actualizar atributo value si aplica
                if ('value' in el) {
                    el.value = adaptedPrice;
                }

                // Actualizar texto auxiliar si existe
                const small = el.querySelector('small');
                if (small) {
                    small.textContent = pageLang === 'en' ? '(Up to 8 students)' : '(Hasta 8 alumnos)';
                }
            }
        });
    });
});
