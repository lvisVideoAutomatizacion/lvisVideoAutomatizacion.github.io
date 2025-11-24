document.addEventListener("DOMContentLoaded", function() {

    // =========
    // vars
    // =========

    // titles
    const europe_title_es = "Accesibilidad que cumple con la normativa europea y española"
    const europe_title_en = "Accessibility that complies with European and Spanish regulations"
    const us_title_es = "Accesibilidad que cumple con las regulaciones de EE.UU y América Latina"
    const us_title_en = "Accessibility that complies with US and Latin American regulations"

    // intro text
    const europe_intro_es = `
        En cumplimiento del <strong>Acta Europea de Accesibilidad</strong> y su desarrollo en España mediante la <strong>Ley 11/2023</strong> y el <strong>Real Decreto 193/2023</strong>,
        <br/> ofrecemos servicios integrales de accesibilidad audiovisual diseñados para garantizar la <strong>igualdad de acceso a la información y la comunicación</strong> 
        <br>para todas las personas, incluidas aquellas con discapacidad visual, auditiva o cognitiva.
    `;

    const europe_intro_en = `
        In compliance with the <strong>European Accessibility Act</strong> and its implementation in Spain through <strong>Law 11/2023</strong> and <strong>Royal Decree 193/2023</strong>,
        <br/> we offer comprehensive audiovisual accessibility services designed to ensure <strong>equal access to information and communication</strong>
        <br/> for all people, including those with visual, hearing, or cognitive disabilities.
    `;

    const us_intro_es = `
        Siguiendo las directrices y recomendaciones de las normativas de accesibilidad de Estados Unidos (<strong>ADA, Sección 508, CVAA</strong>)
        y de las regulaciones de accesibilidad de América Latina, y de acuerdo con estándares globales como las <strong>WCAG y el Tratado de Marrakech</strong>,
        ofrecemos servicios integrales de accesibilidad audiovisual diseñados
        para garantizar el <strong>acceso equitativo a la información y la comunicación</strong>
        para todas las personas, incluidas aquellas con discapacidad visual, auditiva o cognitiva.
    `;

    const us_intro_en = `
        Following the guidelines and recommendations of the US (<strong>ADA, Section 508, CVAA</strong>) 
        and Latin American accessibility regulations, 
        </br>following global standards such as <strong>WCAG and the Marrakesh Treaty</strong>,
        we provide comprehensive audiovisual accessibility services designed 
        <br>to guarantee <strong>equal access to information and communication</strong> 
        for everyone, including people with visual, hearing, or cognitive disabilities.
    `;


    // Elementos lista

    const dynamicItems = {
        europe: {
            es: [
                "Las <strong>normas UNE 153020</strong> (audiodescripción para personas con discapacidad visual)",
                "Las <strong>normas UNE 153010</strong> (subtitulado para personas sordas y con discapacidad auditiva)"
            ],
            en: [
                "<strong>UNE 153020 standards</strong> (audio description for people with visual impairments)",
                "<strong>UNE 153010 standards</strong> (subtitling for deaf and hard-of-hearing people)"
            ]
        },
        america: {
            es: [
                "<strong>Americans with Disabilities Act</strong> (Ley de Estadounidenses con Discapacidad)",
                "<strong>Sección 508 de la Ley de Rehabilitación</strong>",
                "<strong>Ley de Accesibilidad en Comunicaciones y Video del Siglo XXI</strong>"
            ],
            en: [
                "<strong>Americans with Disabilities Act</strong>",
                "<strong>Section 508 of the Rehabilitation Act</strong>",
                "<strong>21st Century Communications and Video Accessibility Act</strong>"
            ]
        }
    };
    
    const europeanLangs = [
        'es','ca','gl','eu','pt','fr','de','it','nl','sv','fi','da','no','is','el','hu','pl','cs','sk','sl','hr','ro','bg','et','lv','lt','mt','cy'
    ];

    // Detectar idioma de la página
    const pageLang = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'es';

    // ==============================
    // Función para determinar región
    // ==============================
    async function getRegionByIP() {
        try {
            const res = await fetch("https://ipapi.co/json/");
            if (!res.ok) throw new Error("IP request failed");

            const data = await res.json();

            // Validación de datos
            if (!data || typeof data.continent_code !== 'string') {
                throw new Error("Malformed IP data");
            }

            const region = data.continent_code.toUpperCase();

            return region === 'EU' ? 'europe' : 'america';
        } catch (e) {
            console.warn("IP detection failure, fallback to browser language:", e);

            const userLang = navigator.language || navigator.userLanguage;
            const langPrefix = userLang.toLowerCase().split('-')[0];
            return europeanLangs.includes(langPrefix) ? 'europe' : 'america';
        }
    }

    // ==============================
    // Modificar textos
    // ==============================
    getRegionByIP().then(region => {

        // Acceder al objeto del DOM
        const h3 = document.querySelector("#services-regulations h3");
        const intro = document.querySelector("#services-regulations #intro");
        const listEl = document.querySelector("#regulations-list");
        if (!h3 || !intro || !listEl) return; 

        // Establecer contenido del texto en función del lenguaje y la región
        let titleText = "";
        let introText = "";
        let items = dynamicItems[region][pageLang] || [];

        if (region === "america" && pageLang === "es") {
            titleText = us_title_es;
            introText = us_intro_es;
        } 
        else if (region === "america" && pageLang === "en") {
            titleText = us_title_en;
            introText = us_intro_en;
        } 
        else if (region === "europe" && pageLang === "es") {
            titleText = europe_title_es;
            introText = europe_intro_es;
        } 
        else {
            titleText = europe_title_en;
            introText = europe_intro_en;
        }

        // Modificar texto en el html
        h3.textContent = titleText;
        intro.innerHTML = introText;

        // Modificar items lista en el html
        items.reverse().forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = item;
            listEl.insertBefore(li, listEl.firstChild);
        });
    });
});
