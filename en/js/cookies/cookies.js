const PronoideCookies = {
  cookieLevelName: 'cookiesLevel',
  currentDomain: '127.0.0.1',
  // currentDomain: 'lvis.es',
  urlPoliticaDeCookies: 'https://pronoide.atlassian.net/wiki/spaces/CAT/pages/1101856864/Notas+legales+y+privacidad',
  expires: 30,
  banner: {
    exists: false,
    html: '\
		<div id="emCookieWrapper">\
			<div id="emCookieBanner">\
				<div class="emCookieContent">\
					<h2>Informaci&oacute;n sobre <em>cookies</em> en la plataforma lvis</h2>\
					<p>%text</p>\
					<p id="emCookieBannerButtons"><a href="#" class="emCookieBtn emCookieBtn-secondary" id="emCookieBtnConfigure">Configurar</a> <a href="#" class="emCookieBtn" id="emCookieBtnAccept">Aceptar</a></p>\
				</div>\
			</div>\
		</div>\
		',
    show: function() {
      if (PronoideCookies.banner.exists == false) {
        var lnk = '<a href="%s" target="_blank" rel="noreferrer noopener">esta p&aacute;gina<span class="emCookieSrAv"> (se abre en ventana nueva)</span></a>';

        var txt = 'Utilizamos <em>cookies</em> propias y de terceros con fines anal&iacute;ticos. En algunos espacios web puede haber v&iacute;deos u otros contenidos de terceros que tambi&eacute;n inserten <em>cookies</em> con fines publicitarios. En ' + lnk + ' encontrar&aacute;s m&aacute;s informaci&oacute;n. Puedes aceptar todas las <em>cookies</em> pulsando &quot;Aceptar&quot; o decidir cu&aacute;les aceptas pulsando &quot;Configurar&quot;.';
        var html = this.html;
        html = html.replace("%text", txt);
        html = html.replace(/%s/g, PronoideCookies.urlPoliticaDeCookies)
        jQuery("body").append(html);
        jQuery("#emCookieBtnAccept").click(function() {
          const keysScriptLevels = Object.keys(scriptsByLevels);
          const level = keysScriptLevels[keysScriptLevels.length - 1]
          PronoideCookies.cookies.setCookie(level, PronoideCookies.currentDomain);
          PronoideCookies.reloadPage();
          return false;
        });
        jQuery("#emCookieBtnConfigure").click(function() {
          PronoideCookies.banner.hide();
          PronoideCookies.dialog.show();
          return false;
        });
        PronoideCookies.banner.exists = true;
      } else {
        jQuery("#emCookieBanner").show();
      }
    },
    hide: function() {
      jQuery("#emCookieBanner").hide();
    }
  }, // BANNER
  dialog: {
    exists: false,
    html: '\
		<div id="emCookieTool">\
			<div class="emCookieContent">\
				<p class="emCookieRight"><a href="#emCookieBtnConfigure" id="emCookieBtnConfigureClose" title="Cerrar el di&aacute;logo informativo"><span class="emCookieSrAv">Cerrar</span></a></p>\
				<h2>Configuraci&oacute;n de <em>cookies</em> en lvis</h2>\
				<p>Usamos <em>cookies</em> propias y de terceros en los dominios <strong>lvis.video</strong> y <strong>lvis.es</strong> para las finalidades indicadas a continuaci&oacute;n. Si no est&aacute; de acuerdo con alguna de ellas, puede cambiar sus opciones desde esta pantalla.</p>\
				<p>M&aacute;s informaci&oacute;n sobre las <em>cookies</em> (qu&eacute; son, para qu&eacute; sirven, qui&eacute;n las usa, c&oacute;mo rechazarlas&hellip;) en nuestra <a href="%s" target="_blank" rel="noreferrer noopener">pol&iacute;tica de <em>cookies</em><span class="emCookieSrAv"> (se abre en ventana nueva)</span></a>.</p>\
				<h3>Permitir las cookies para las siguientes finalidades:</h3>\
				<ol>\
					<li>\
						<span class="emCookieDesc">\
							<strong id="emCookieType1" class="emCookieType">1. Esenciales</strong> \
							<span class="emCookieInfo" id="emCookieInfo1">\
								Necesarias para prestar el servicio solicitado (autenticaci&oacute;n, navegaci&oacute;n, personalizaci&oacute;n de interfaz, reproducci&oacute;n de v&iacute;deos&hellip;). No se pueden rechazar.\
							</span>\
						</span>\
						<span class="emCookieBtns">\
							<a href="#" class="emCookieBtn emCookieBtn-secondary emCookieBtn-disabled" aria-describedby="emCookieType1">Rechazar</a> <a href="#" class="emCookieBtn emCookieBtn-secondary emCookieBtn-disabled" aria-describedby="emCookieType1">Aceptar</a> \
						</span>\
					</li>\
					<li>\
						<span class="emCookieDesc">\
							<strong id="emCookieType2" class="emCookieType">2. De an&aacute;lisis <span id="emCookieType2Status"></span></strong> \
							<a href="#emCookieInfo2" class="emCookieInfoToggler" id="emCookieInfo2Toggler" title="Mostrar m&aacute;s informaci&oacute;n">Informaci&oacute;n sobre las finalidades estad&iacute;sticas</a>\
							<span class="emCookieInfo" id="emCookieInfo2">\
								 <a href="#emCookieInfo2" class="emCookieInfoHide" title="Ocultar la informaci&oacute;n" id="emCookieInfo2Hide">Informaci&oacute;n sobre las finalidades estad&iacute;sticas</a> &rarr; \
								 Para cuantificar las visitas y elaborar estad&iacute;sticas de uso de los servicios para mejorarlos. Usamos sistemas de estad&iacute;sticas propios y, en algunos espacios, Google Analytics.\
							</span>\
						</span>\
						<span class="emCookieBtns">\
							<a href="#" class="emCookieBtn emCookieBtn-error emCookieBtn-secondary" aria-describedby="emCookieType2" id="emCookieType2_no">Rechazar</a> <a href="#" class="emCookieBtn emCookieBtn-success emCookieBtn-secondary" aria-describedby="emCookieType2" id="emCookieType2_yes">Aceptar</a> \
						</span>\
					</li>\
					<li>\
						<span class="emCookieDesc">\
							<strong id="emCookieType3" class="emCookieType">3. Otras <span id="emCookieType3Status"></span></strong> \
							<a href="#emCookieInfo3" class="emCookieInfoToggler" id="emCookieInfo3Toggler" title="Mostrar m&aacute;s informaci&oacute;n">Informaci&oacute;n sobre finalidades de proveedores externos</a>\
							<span class="emCookieInfo" id="emCookieInfo3">\
								<a href="#emCookieInfo3" class="emCookieInfoHide" title="Ocultar la informaci&oacute;n" id="emCookieInfo3Hide">Informaci&oacute;n sobre finalidades de proveedores externos</a> &rarr; \
								Son <em>cookies</em> de terceros insertadas, en la mayor&iacute;a de los casos, por los usuarios de los servicios de la Plataforma lvis para mostrar contenidos (de diferentes or&iacute;genes, como Youtube, Issuu, Scribd, Twitter, Padlet o cualquier otro proveedor de contenidos externo), o crear enlaces para facilitar la compartici&oacute;n de contenidos en redes sociales (AddThis, por ejemplo).<br /><br />\
								Las <em>cookies</em> utilizadas en dichos contenidos no son tratadas por lvis, sino por dichos proveedores, y podr&iacute;an ser utilizadas con diferentes objetivos, incluyendo fines publicitarios. Encontrar&aacute; m&aacute;s informaci&oacute;n sobre este aspecto en nuestra <a href="%s" target="_blank" rel="noreferrer noopener">pol&iacute;tica de <em>cookies</em><span class="emCookieSrAv"> (se abre en ventana nueva)</span></a>.<br /><br />\
								Si rechaza estas <em>cookies</em>, <strong>no podr&aacute; ver esos contenidos</strong> (v&iacute;deos externos, etc.) cuando est&eacute;n insertados en una p&aacute;gina de lvis.<br /><br />\
								<strong>lvis prohibe la inserci&oacute;n directa de publicidad en sus p&aacute;ginas.</strong> Por favor, si detecta alg&uacute;n caso, contacte con los responsables de la Plataforma para informar de la infracci&oacute;n.\
							</span>\
						</span>\
						<span class="emCookieBtns">\
							<a href="#" class="emCookieBtn emCookieBtn-error emCookieBtn-secondary" aria-describedby="emCookieType3" id="emCookieType3_no">Rechazar</a> <a href="#" class="emCookieBtn emCookieBtn-success emCookieBtn-secondary" aria-describedby="emCookieType3" id="emCookieType3_yes">Aceptar</a> \
						</span>\
					</li>\
				</ol>\
				<p id="emCookieSaveBtns"><a href="#" class="emCookieBtn emCookieBtn emCookieBtn-secondary" id="emCookieBtnRejectAll">Rechazar todas las cookies</a> <a href="#" class="emCookieBtn emCookieBtn emCookieBtn-secondary" id="emCookieBtnAcceptSelected">Aceptar las cookies seleccionadas</a> <a href="#" class="emCookieBtn emCookieBtn" id="emCookieBtnAcceptAll">Aceptar todas las cookies</a></p>\
			</div>\
		</div>\
		',
    enableButton: function(e) {
      var id = e.id;
      var parts = id.split("_");
      if (parts.length != 2) return;
      var base = parts[0];
      var type = parts[1];
      if (type == 'no') {
        jQuery("#" + base + "Status").html("(rechazar)");
        jQuery("#" + base + "_yes").addClass("emCookieBtn-secondary");
      } else {
        jQuery("#" + base + "Status").html("(aceptar)");
        jQuery("#" + base + "_no").addClass("emCookieBtn-secondary");
      }
      jQuery(e).removeClass("emCookieBtn-secondary");
    },
    show: function() {
      if (PronoideCookies.dialog.exists == false) {
        var html = this.html;
        html = html.replace(/%s/g, PronoideCookies.urlPoliticaDeCookies)
        jQuery("body").addClass("emCookieToolVisible");
        PronoideCookies.dialog.exists = true;
        jQuery("#emCookieWrapper").append(html);

        jQuery(".emCookieInfoToggler").click(function() {
          var e = jQuery(this);
          jQuery(e.attr("href")).show();
          var id = this.id;
          id = id.replace("Toggler", "Hide");
          jQuery("#" + id).focus();
          e.hide();
          return false;
        });

        jQuery(".emCookieInfoHide").click(function() {
          var e = jQuery(this);
          jQuery(e.attr("href")).hide();
          jQuery(e.attr("href") + "Toggler").show().focus();
          return false;
        });

        jQuery("#emCookieBtnConfigureClose").click(function() {
          PronoideCookies.dialog.hide();
          PronoideCookies.banner.show();
          jQuery("#emCookieBtnConfigure").focus();
          return false;
        });

        jQuery(".emCookieBtn-disabled").click(function() {
          return false;
        });

        jQuery("#emCookieType2_no").click(function() {
          PronoideCookies.dialog.enableButton(this);
          jQuery("#emCookieType3_no").trigger("click");
          return false;
        });

        jQuery("#emCookieType2_yes").click(function() {
          PronoideCookies.dialog.enableButton(this);
          return false;
        });

        jQuery("#emCookieType3_no").click(function() {
          PronoideCookies.dialog.enableButton(this);
          return false;
        });

        jQuery("#emCookieType3_yes").click(function() {
          PronoideCookies.dialog.enableButton(this);
          jQuery("#emCookieType2_yes").trigger("click");
          return false;
        });

        jQuery("#emCookieBtnRejectAll").click(function() {
          jQuery("#emCookieType2_no,#emCookieType3_no").trigger("click");
          PronoideCookies.dialog.save();
          return false;
        });

        jQuery("#emCookieBtnAcceptSelected").click(function() {
          PronoideCookies.dialog.save();
          return false;
        });

        jQuery("#emCookieBtnAcceptAll").click(function() {
          jQuery("#emCookieType2_yes,#emCookieType3_yes").trigger("click");
          PronoideCookies.dialog.save();
          return false;
        });

      } else {
        jQuery("#emCookieTool").show();
        jQuery("body").addClass("emCookieToolVisible");
      }
    },
    hide: function() {
      jQuery("#emCookieTool").hide();
      jQuery("body").removeClass("emCookieToolVisible");
      jQuery(".emCookieInfoToggler").show();
      jQuery(".emCookieInfo").hide();
      jQuery(".emCookieType span").html("");
      jQuery(".emCookieBtns .emCookieBtn").addClass("emCookieBtn-secondary");
    },
    save: function() {
      // 0 = Only required
      // 1 = Analytics
      // 2 = Other
      var level = 0;
      if (jQuery("#emCookieType2Status").html() == "(aceptar)") level = 1;
      if (jQuery("#emCookieType3Status").html() == "(aceptar)") level = 2;
      jQuery("#emCookieSaveBtns").addClass("emCookieLoading");
      jQuery("#emCookieTool a").unbind("click").click(function() {
        return false;
      });
      setTimeout(function() {
        PronoideCookies.cookies.setCookie(level, PronoideCookies.currentDomain)
        PronoideCookies.reloadPage();
      }, 1000);
    }
  }, // DIALOG
  reloadPage: function() {
    setTimeout(() => {
      window.location.reload();
    }, 1000)
  },
  cookies: {
    getLevelOfAcceptedCookies: function() {
      const level = PronoideCookies.cookies.getCookie(PronoideCookies.cookieLevelName);
      return level ?? -1;
    },
    checkAcceptedCookies: function(level) {
      if (!level || !["0", "1", "2"].includes(level)) {
        return false;
      }
      return true;
    },
    setCookie: function(value, domain) {
      const days = PronoideCookies.expires;
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = "; expires=" + date.toGMTString();
      const cookieTxt = `${PronoideCookies.cookieLevelName}=${value}${expires}; path=/; domain=${domain}`
      document.cookie = cookieTxt;
    },
    getCookie: function(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
    },
  },
  scriptsToLoad: {
    getScriptsByLevel: function(level) {
      const scriptsToLoad = Object.keys(scriptsByLevels).reduce((acc, el) => {
        if (el <= level) {
          return [...acc, ...scriptsByLevels[el]]
        }
        return acc;
      }, [])
      return scriptsToLoad;
    },
  },
  init: function() {
    const level = PronoideCookies.cookies.getLevelOfAcceptedCookies();
    if (PronoideCookies.cookies.checkAcceptedCookies(level)) {
      // Cargamos scripts de cookies
      // 0 -> 0
      // 1 -> 0 y 1
      // 2 -> 0, 1 y 2
      const scriptsToExecute = PronoideCookies.scriptsToLoad.getScriptsByLevel(Number(level))
      scriptsToExecute.forEach(fn => {
        fn()
      });
    } else {
      PronoideCookies.banner.show();
    }
  }
}

PronoideCookies.init();
