<script lang="ts">
    import onMount from "@e/onMount";
    import { Vector2 } from "../zhen/Utils/Vector2";

    // Params
    let mouseMoveScale: number = 0.25;
    let targetTextLenght: number = 100;

    // Site variables
    let mousePos: Vector2;

    // Element binded variables
    let mouseRelativeScaled: Vector2 = new Vector2(0, 0);

    let windowWidth = 0;
    let windowHeight = 0;

    let screenCenter: Vector2;

    let StartPageAnimated: Element | null;
    let windowRef: Window;

    function onMouseMoved(event: MouseEvent) {
        mousePos = new Vector2(event.clientX, event.clientY);

        updateAnimation(mousePos);
    }

    function updateAnimation(mousePos: Vector2) {
        let mouseRelativePos = mousePos.Sub(screenCenter);
        mouseRelativeScaled = mouseRelativePos.Scale(mouseMoveScale);

        //console.log(mouseRelativePos.x+"\n"+mouseRelativePos.y);
    }

    onMount(() => {
        windowRef = window;

        const updateDimensions = () => {
            windowWidth = windowRef.innerWidth;
            windowHeight = windowRef.innerHeight;

            screenCenter = new Vector2(windowWidth / 2, windowHeight / 2);

            //console.log("Window size changed: (" + windowWidth + ", " + windowHeight + ")");
        };

        updateDimensions(); // On first pass

        windowRef.addEventListener("resize", updateDimensions);

        const RevertToOrigin = () => {
            if (
                navigator.userAgent.search(/gecko/i) > 0 &&
                StartPageAnimated !== null
            ) {
                StartPageAnimated.classList.add("FirefoxSmoothTranition");
            }
            updateAnimation(new Vector2(windowWidth / 2, windowHeight / 2));
        };
        document.documentElement.addEventListener("mouseleave", RevertToOrigin);

        const RemoveFirefoxSmoothTranition = () => {
            if (
                navigator.userAgent.search(/gecko/i) > 0 &&
                StartPageAnimated !== null
            ) {
                StartPageAnimated.classList.remove("FirefoxSmoothTranition");
            }
        };
        document.documentElement.addEventListener(
            "mouseenter",
            RemoveFirefoxSmoothTranition,
        );

        return () => {
            windowRef.removeEventListener("resize", updateDimensions);
        };
    });

    const programmingLanguages: string[] = [
        "C++",
        "C#",
        "ARDUINO",
        "PYTHON",
        "JAVA",
        "JAVASCRIPT",
        "TYPESCRIPT",
        "HTML",
        "CSS",
    ];

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    function GrabRandomString() {
        let outString: string = "";
        while (outString.length < targetTextLenght) {
            outString +=
                programmingLanguages[
                    getRandomInt(programmingLanguages.length)
                ] + " ";
        }

        return outString; // At about target size
    }
</script>

<svelte:window on:mousemove={onMouseMoved} />

<div
        class="StartPageAnimated top-0 left-0 w-full h-full"
        id="StartPageAnimated"
        bind:this={StartPageAnimated}
        style="transform: translate({mouseRelativeScaled.x}px, {mouseRelativeScaled.y}px) translateZ(0) rotate(0.001deg);"
    >
        {#each {length: 100} as _, i}

            <span
            class="rotate45 SkillsText"
            >
                {GrabRandomString()}
            </span
        >
        {/each}
    </div>
<style>
    .StartPageContainer {
        /* height: 40vh; */

        background-color: burlywood;
        overflow: hidden;
        position: relative;

        justify-content: center;
        align-items: center;
        display: flex;

        padding: 0;
    }

    .StartPageAnimated {
        padding: 0;

        transition: transform 1000ms cubic-bezier(0.16, 1.63, 0.01, 0.99);
        -moz-transition: none;
        justify-content: center;
        vertical-align: middle;
        display: flex;

        pointer-events: none;
    }

    .FirefoxSmoothTranition {
        transition: transform 1000ms cubic-bezier(0.16, 1.63, 0.01, 0.99);
        -moz-transition: transform 1000ms cubic-bezier(0.16, 1.63, 0.01, 0.99) !important;
    }

    .SkillsText {
        font-family: "CozetteVector";

        text-align: start;
        font-size: x-large;
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;

        width: 2rem;

        color: rgb(66, 66, 66);
    }

    .rotate45 {
        transform: rotate(-45deg); /* Rotate the element by 45 degrees */
    }
</style>
