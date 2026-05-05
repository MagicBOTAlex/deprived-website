<script lang="ts">
    import ProjectEntry from "./lib/ProjectEntry.svelte";
</script>

<div class="content">
    <h1>Benjamin's portfolie for Informatik</h1>
    <p>
    Forneden kan ses en række projekter som er blevet lavet i Informatik C og efterfølgende Informatik B.
    </p>
    <div class="projects">
        <ProjectEntry
            thumbnail_url={"/portfolios/sveske/appLab/thumb.png"}
            thumbnail_alt={"App Lab"}
            download={"/portfolios/sveske/appLab/applab_rapport.pdf"}
            title={"1.G - App Lab: Idle spil i browseren"}
            summary={"Vi udviklede et idle spil i App Lab. Brugte JavaScript til at programmere spillet."}
        />
        <ProjectEntry
            thumbnail_url={"/portfolios/sveske/teachable_machine/thumb.png"}
            thumbnail_alt={"Teachable Machine"}
            download={"/portfolios/sveske/teachable_machine/teachable_machine_rapport.pdf"}
            title={"1.G - Teachable Machine: Håndtegns detektor"}
            summary={"I dette projekt udarbejdede vi en teachable machine model til at detektere forskellige håndtegn"}
        />
        <ProjectEntry
            thumbnail_url={"/portfolios/sveske/firebase/thumb.png"}
            thumbnail_alt={"Firebase"}
            download={"/portfolios/sveske/firebase/firebase_rapport.pdf"}
            title={"1.G - Firebase: Netværk scoreboard i Unity"}
            summary={"Med brug af Firebase udviklede vi et scoreboard som synkroniserer med en Firebase Data Store. Scoreboardet blev implementeret i et tidligere spil udviklet i Teknologi B"}
        />
        <ProjectEntry
            thumbnail_url={"/portfolios/sveske/the_red_paper/thumb.png"}
            thumbnail_alt={"The Red Paper"}
            download={"/portfolios/sveske/the_red_paper/the_red_paper_rapport.pdf"}
            title={"2.G - HTML: Hjemmeside udviklet ud fra gestalt lovene"}
            summary={"Udviklede en klon af \"Den Blå Avis\", som forsøger at demonstrere en række af de forskellige gestaltlove"}
        />
        <ProjectEntry
            thumbnail_url={"/portfolios/sveske/makeymakey/thumb.png"}
            thumbnail_alt={"MakyeMakey"}
            download={"/portfolios/sveske/makeymakey/makeymakey_rapport.pdf"}
            title={"2.G - MakeyMakey: Installation som spiller Minecraft lyde i en af skolens gange"}
            summary={"Skulle lave en interresant installation til en lokation på skolen. Vi udviklede en sensor, som detekterede når en person gik ind på en af skolens gange med makeymakey'en og spillede grotte lyde fra Minecraft"}
        />
        <ProjectEntry
            thumbnail_url={"/portfolios/sveske/hmi/thumb.png"}
            thumbnail_alt={"HMI"}
            download={"/portfolios/sveske/hmi/hmi_rapport.pdf"}
            title={"3.G - Human Machine Interface: Enhed som kan signalere brugeren hvis en person er på vej ind på brugerens værelse"}
            summary={"Brugte M5 mikrokontrolleren til at forbinde en IR bevægelsessensor. Sensoren sender beskeder over netværket til et armbånd som er bundet om brugerens håndled"}
        />
        <ProjectEntry
            thumbnail_url={"/portfolios/sveske/prolog/thumb.png"}
            thumbnail_alt={"Prolog"}
            download={"/portfolios/sveske/prolog/prolog_rapport.pdf"}
            title={"3.G - Prolog: Rejseekspertsystem"}
            summary={"Brugte prolog programmeringsproget til at lave et ekspertsystem. Specifikt kan det give anbefalinger til rejsedestinationer ud fra en række faktorer som temperatur, økonomi, aktiviter osv."}
        />
        <ProjectEntry
            thumbnail_url={"/portfolios/sveske/eksamen/thumb.jpg"}
            thumbnail_alt={"Informatik Eksamen"}
            download={"/portfolios/sveske/eksamen/informatik_eksamen_rapport.pdf"}
            title={"3.G - Eksamens projekt: Udvikling af opgavesystem til fysisk produkt om læringsdisplay af digital logik"}
            summary={"Udviklede et opgavesystem i form af en app i Unity. Opgavesystemet virker i samarbejde med et fysisk produkt udviklet til eksamensprojektet i teknikfag - Digital Design og Udvikling A. Appen skal undervise computer science elever på gymnasiet om digital logik og logiske porte"}
        />
    </div>
</div>

<style>
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .projects {
        margin-top: 25px;
        display: flex;
        flex-direction: column;
        gap: 25px;

        max-width: 1000px;
    }
</style>

