<script lang="ts">
    export let download : string = '404';
    export let thumbnail_url : string = '/favicon.png';
    export let thumbnail_alt : string = 'Picture describting the deprived devs logo';
    export let title : string = '<title>';
    export let summary : string = '<summary>';

</script>

<div class="news-card">
    <a href={download}>
        <div class="thumbnail">
            <img src={thumbnail_url} alt={thumbnail_alt}/>
        </div>
        <div class="content">
            <h3 id="title">{title}</h3>
            <p id="summary-text">{summary}</p>
        </div>
    </a>
</div>

<style>
    a {
        text-decoration: none;

        display: flex;
        flex-direction: row;
        gap: 15px;
    }

    .thumbnail > img {
        object-fit: cover;

        box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.5);
        border-radius: 8px;

        width: 150px;
        height: auto;
    }

    .content {
        flex-shrink: 2;

        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    #title {
        margin: 0;
        text-decoration: none;
        color: var(--text2);
    }

    #summary-text {
        margin: 0;
        text-decoration: none;
        color: var(--text3);
    }
</style>
