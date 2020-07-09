const routes = [
    {
        path: '/',
        getTemplate: () => '<h1>Home</h1><p>Welcome ...</p>',
        title: 'Home'
    },
    {
        path: '/about',
        getTemplate: () => '<h1>About</h1><p>About page here...</p>',
        title: 'About'
    },
    {
        path: '/about/contact',
        getTemplate: () => '<h1>Contact</h1><p>About contact page here...</p>',
        title: 'Contact'
    },
    {
        path: '/team',
        getTemplate: params => `
        <h1>Our Team</h1>
        <p>Some team infos...</p>
        <ul>
            <li><a class="router__link" href="/team/John">John</a></li>
            <li><a class="router__link" href="/team/Jane">Jane</a></li>
            ${test.map(user => `<li><a class="router__link" href="/team/${user}">${user}</a></li>`).join('')}
        </ul>`,
        title: 'Team'
    },
    {
        path: '/team/:username',
        getTemplate: params => `<h1>Hello, ${params.username}!</h1>`,
        title: 'Team'
    }
];

export const notFound = {
    getTemplate: () => '<h1>Page not found!</h1>',
    title: 'Page not found'
};

const test = ['Alfredo', 'Hernando', 'Albaros'];

export { routes };
