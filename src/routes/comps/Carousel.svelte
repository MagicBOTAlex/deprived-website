<script lang="ts">
  import onMount from "@e/onMount";

  export let images: string[] = []; // Expose images as a parameter
  let currentIndex: number = 0;

  let startX: number | null = null; // Track touch start X position
  let deltaX: number = 0; // Track touch delta X

  const nextSlide = (): void => {
    currentIndex = (currentIndex + 1) % images.length;
  };

  const prevSlide = (): void => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  };

  const handleTouchStart = (event: TouchEvent): void => {
    startX = event.touches[0].clientX;
  };

  const handleTouchMove = (event: TouchEvent): void => {
    if (startX !== null) {
      deltaX = event.touches[0].clientX - startX;
    }
  };

  const handleTouchEnd = (): void => {
    if (startX !== null) {
      if (deltaX > 50) {
        prevSlide(); // Swipe right
      } else if (deltaX < -50) {
        nextSlide(); // Swipe left
      }
    }
    // Reset touch variables
    startX = null;
    deltaX = 0;
  };
</script>

<style>
  .carousel {
    position: relative;
    overflow: hidden;
    width: 100%;
    max-width: 800px;
    height: 100%;
    margin: auto;
  }

  .slides {
    display: flex;
    transition: transform 0.5s ease-in-out;
    width: 100%;
  }

  .slide {
    flex: 0 0 100%;
    object-fit: cover;
    object-position: center;
  }

  .controls {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
  }

  .control {
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
  }

  .indicators {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 10px;
    width: 100%;
  }

  .indicator {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background: white;
    border-radius: 50%;
    opacity: 0.5;
    cursor: pointer;
  }

  .indicator.active {
    opacity: 1;
  }
</style>

<div 
  class="carousel" 
  on:touchstart|preventDefault={handleTouchStart}
  on:touchmove|preventDefault={handleTouchMove}
  on:touchend|preventDefault={handleTouchEnd}
>
  <div
    class="slides"
    style="transform: translateX(-{currentIndex * 100}%);"
  >
    {#each images as image (image)}
      <img class="slide" src={image} alt="Carousel Slide" />
    {/each}
  </div>

  <div class="controls">
    <button class="control" on:click={prevSlide}>&lt;</button>
    <button class="control" on:click={nextSlide}>&gt;</button>
  </div>

  <div class="indicators">
    {#each images as _, index}
      <div
        class="indicator {index === currentIndex ? 'active' : ''}"
        on:click={() => (currentIndex = index)}
      ></div>
    {/each}
  </div>
</div>