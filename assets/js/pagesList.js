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
        pageTitle: "Comunic",
        methodHandler: "ComunicWeb.pages.home.home.openHomePage",
        disableMenus: false,
    },

    /**
     * User profile page
     */
    user: {
        pageTitle: "User Page",
        methodHandler: "ComunicWeb.pages.userPage.main.open",
        disableMenus: false,
    },

    /**
     * Single post page
     */
    post: {
        pageTitle: "Post",
        methodHandler: "ComunicWeb.pages.postPage.main.open",
        disableMenus: false
    },

    /**
     * Latest post
     */
    latest: {
        pageTitle: "Latest",
        methodHandler: "ComunicWeb.pages.latestPosts.main.open",
        disableMenus: false
    },

    /**
     * Login page
     */
    login: {
        pageTitle: "Login page",
        methodHandler: "ComunicWeb.pages.login.openLoginPage",
        disableMenus: true,
    },

    /**
     * Logout page
     */
    logout: {
        pageTitle: "Logout",
        methodHandler: "ComunicWeb.pages.logout.openLogoutPage",
        disableMenus: true,
    },

    /**
     * 404 Page not found
     */
    notFound: {
        pageTitle: "404 page not found",
        methodHandler: "ComunicWeb.common.error.pageNotFound",
    }

};