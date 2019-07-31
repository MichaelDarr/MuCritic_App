<template>
    <div class="about">
        <SmallLogo />
        <div class="about-content">
            <h1 class="about-header">
                Approach
            </h1>
            <p>
                μCritic imagines <i>you</i> as a music critic.
            </p>
            <p>
                At the heart of μCritic is an enormous quantity of data scraped from <a href="https://rateyourmusic.com/">Rate Your Music</a>, a website where passionate amateur music critics rate albums on a scale of 0 - 5. μCritic has analyzed hundreds of thousands of album reviews, learning the unique music tastes belonging to hundreds of Rate Your Music users. Then, it explored the relationship between the music tastes and favorite artists of each user.
            </p>
            <p>
                To recommend albums for new users, μCritic reverses this process. When a user logs in with Spotify, their 5 favorite artists are fed into the system. μCritic uses these artists to construct the user’s music taste, as if they were a critic from Rate Your Music. This taste is applied to a large set of albums, generating a numeric rating for each. The albums are sorted according to these ratings, and presented as recommendations.
            </p>
            <hr>
            <h1 class="about-header">
                Source Code
            </h1>
            <h2>
                <a href="https://github.com/MichaelDarr/MuCritic">Data &amp; Model</a>
            </h2>
            <h2>
                <a href="https://github.com/MichaelDarr/MuCritic_App">Web App</a>
            </h2>
            <hr>
            <h1 class="about-header">
                Dataset
            </h1>
            <p>
                μCritic is built on a new dataset aggregated specifically for the project. A custom web scraper was built to crawl Rate Your Music and save relational music data into a local database. Spotify IDs for each of the scraped albums/artists were mapped via the <a href="https://developer.spotify.com/documentation/web-api/reference/search/search/">Spotify API search endpoint</a> and used for further data retrieval. The final training dataset consists of roughly
                <ul>
                    <li>250 users</li>
                    <li>40,000 artists</li>
                    <li>150,000 albums</li>
                    <li>300,000 user reviews</li>
                </ul>
            </p>
            <p class="footnote">
                *The legality of web scraping has been repeatedly upheld in court. Furthermore, μCritic's use of the data falls under fair use.
            </p>
            <hr>
            <h1 class="about-header">
                Models
            </h1>
            <p class="subheading-link">
                <a href="https://i.imgur.com/wHM4wJa.jpg">master diagram</a>
            </p>
            <h2>
                Model 1 - <a href="https://i.imgur.com/JMjUQoZ.jpg">diagram</a>
            </h2>
            <p>
                <ul>
                    <li>Type: Deep Belief Network</li>
                    <li>Input: Artist Data (from Spotify API &amp; RYM Scraper)</li>
                    <li>Output: Latent Artist Representation</li>
                    <li>Internal Models</li>
                    <ul>
                        <li>a: Autoencoder</li>
                        <li>b: Recurrent Autoencoder</li>
                        <li>c: Autoencoder</li>
                    </ul>
                </ul>
            </p>
            <h2>
                Model 2 - <a href="https://i.imgur.com/qJWVhWx.jpg">diagram</a>
            </h2>
            <p>
                <ul>
                    <li>Type: Deep Belief Network</li>
                    <li>Input: Album Data (from Spotify API)</li>
                    <li>Output: Latent Album Representation</li>
                    <li>Internal Models</li>
                    <ul>
                        <li>a: Autoencoder</li>
                        <li>b: Recurrent Autoencoder</li>
                        <li>c: Autoencoder</li>
                    </ul>
                </ul>
            </p>
            <h2>
                Model 3
            </h2>
            <p>
                <ul>
                    <li>Type: Perceptron</li>
                    <li>Input: Latent Album Representation</li>
                    <li>Output: Album Score</li>
                </ul>
            </p>
            <h2>
                Model 4
            </h2>
            <p>
                <ul>
                    <li>Type: Recurrent Autoencoder</li>
                    <li>Input: 5 Ouputs of <b>Model 2</b></li>
                    <li>Output: Latent Artist Representations</li>
                </ul>
            </p>
            <h2>
                Model 5
            </h2>
            <p>
                <ul>
                    <li>Type: Vec2Vec Neural Network</li>
                    <li>Input: Output of <b>Model 4</b></li>
                    <li>Output: Weights for <b>Model 3</b> (music taste)</li>
                </ul>
            </p>
            <p class="footnote">
                *Testing and validation datasets withheld for all models during training. For metric integrity, models have not yet been evaluated using test sets, and will not be until μCritic has a stable release. Validation sets were used during training to fine-tune hyperparameters.
            </p>
            <hr>
            <h1 class="about-header">
                Tooling
            </h1>
            <h2>
                Web Scraping &amp; Data Handling
            </h2>
            <p>
                <ul>
                    <li>Language: Typescript</li>
                    <li>Platform: Node.js</li>
                    <li>Database: PostgreSQL, via <a href="https://typeorm.io/">TypeORM</a></li>
                    <li>Caching: Redis</li>
                    <li>Scraping/Parsing: <a href="https://github.com/MichaelDarr/MuCritic/tree/master/src">Fully Custom</a></li>
                    <li>Proxy Management: <a href="https://www.scraperapi.com/">ScraperApi</a></li>
                </ul>
            </p>
            <h2>
                Machine Learning
            </h2>
            <p>
                <ul>
                    <li>Languages</li>
                    <ul>
                        <li>Python (modeling)</li>
                        <li>TypeScript (data pipeline)</li>
                    </ul>
                    <li>Libraries</li>
                    <ul>
                        <li>Tensorflow 2.0</li>
                        <li>Tensorflow.js</li>
                        <li>Numpy</li>
                    </ul>
                </ul>
            </p>
            <h2>
                Web App
            </h2>
            <p>
                <ul>
                    <li>Language: Typescript</li>
                    <li>Framework: Vue.js</li>
                    <li>State Management: Vuex</li>
                    <li>ML: Tensorflow.js</li>
                    <li>Bundler: webpack</li>
                    <li>Deployment: Github Pages</li>
                </ul>
            </p>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import SmallLogo from '@/components/SmallLogo.vue';

@Component({
    components: {
        SmallLogo,
    },
})
export default class Recommend extends Vue {}

</script>

<style scoped>
.about {
    width: 100%;
}

.about-content {
    text-align: left;
}

.footnote {
    font-size: 1rem;
}

.about-header {
    text-transform: uppercase;
}

.subheading-link {
    margin-top: -1em;
}

p {
    font-size: 1.4rem;
}

a {
    color: #52baff;
}

hr {
    margin: 2em 0 2em 0;
}
</style>
