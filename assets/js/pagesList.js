/**
 * Differents pages listing
 * 
 * @author Pierre HUBERT
 */
ComunicWeb.pagesList = {

    /**
     * Home page
     */
    home: {
        pageTitle: "Comunic, v2",
        methodHandler: "ComunicWeb.pages.home.home.openHomePage",
    },

    /**
     * Login page
     */
    login: {
        pageTitle: "Login page",
        methodHandler: "ComunicWeb.pages.login.openLoginPage",
    },

    /**
     * 404 Page not found
     */
    notFound: {
        pageTitle: "404 page not found",
        methodHandler: "ComunicWeb.common.error.pageNotFound",
    }

};