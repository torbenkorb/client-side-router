import { routes, notFound } from './routes.js';

class Router {
    constructor(routes) {
        this.routes = routes;
        this.dom = document.querySelector('#app');
        this.renderRoute();
        window.onpopstate = () => this.renderRoute();
    }

    handleLinkClick(e) {
        e.preventDefault();
        const url = e.target.pathname;
        history.pushState({}, '', url);
        this.renderRoute();
    }

    setupLinks() {
        for (let link of document.querySelectorAll('.router__link')) {
            link.onclick = e => this.handleLinkClick(e);
        }
    }

    get pathSegments() {
        const pathnameSplit = window.location.pathname.split('/');
        return pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';
    }

    matchRoute(urlSegments) {
        const params = {};
        const matchedRoute = this.routes.find(route => {
            const routePathSegments = route.path.split('/').slice(1);
            if (routePathSegments.length !== urlSegments.length) return false;
            const match = routePathSegments.every((routePathSegment, i) => routePathSegment === urlSegments[i] || routePathSegment[0] === ':');
            if (match) {
                routePathSegments.forEach((segment, i) => {
                    if (segment[0] === ':') {
                        const propName = segment.slice(1);
                        params[propName] = decodeURIComponent(urlSegments[i]);
                    }
                });
            }
            return match;
        });
        return matchedRoute ? { ...matchedRoute, params } : notFound;
    }

    renderRoute() {
        const matchedRoute = this.matchRoute(this.pathSegments);
        document.title = matchedRoute.title;
        this.dom.innerHTML = matchedRoute.getTemplate(matchedRoute.params);
        this.setupLinks();
    }
}

const myapp = new Router(routes);
console.log(myapp);
