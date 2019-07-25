<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">
                Generate Your Taste
            </router-link>
            <span class="spacer" />
            <router-link to="/about">
                How it Works
            </router-link>
            <span
                id="spacer-middle"
                class="spacer"
            />
            <router-link to="/contact">
                Get in Touch
            </router-link>
            <span class="spacer" />
            <a href="https://github.com/MichaelDarr/MuCritic-2.0">Source Code</a>
        </div>
        <router-view />
    </div>
</template>

<style>
html, body, #app {
    background-color: #1b1b1b;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fff;
}
#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #fff;
    text-decoration: none;
}

#nav a:hover {
    text-decoration: underline;
}

#nav a.router-link-exact-active {
    color: #52baff;
}

.spacer {
    display: inline-block;
    width: 2em;
}

#spacer-middle {
    display: block;
    height: 30px;
}

@media (min-width: 620px) {
    .spacer {
        display: inline-block;
        width: 1em;
    }
    #spacer-middle {
        display: inline-block;
    }
}

@media (min-width: 710px) {
    .spacer {
        width: 3em;
    }
}
</style>
