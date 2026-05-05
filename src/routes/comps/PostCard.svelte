<script lang="ts">
  import Carousel from './Carousel.svelte';

  export let title: string;
  export let description: string;
  export let jam = { name: '', url: '' };
  export let viewUrl : string= '';
  export let images: string[] = [];
  export let placeholder = false;
</script>

<div class="games card bg-base-100 shadow-xl {placeholder ? 'w-96' : ''}">
  {#if !placeholder}
    <figure style="height: 15em;">
      <Carousel {images} />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{title}</h2>
      <p>{description}</p>
      <br />
      <p>
        This was made during
        <a href={jam.url} class="underline" target="_blank" rel="noopener">
          {jam.name}
        </a>
      </p>
      <div class="card-actions justify-end">
        <a href={viewUrl}
           class="btn btn-primary text-primary-content"
           target="_blank"
           rel="noopener"
        >
          View on itch.io
        </a>
      </div>
    </div>
  {:else}
    <figure class="rounded-b-none" style="height: 15em;">
      <div class="bg-grid-100 flex w-full h-full"></div>
    </figure>
    <div class="card-body">
      <h2 class="card-title">What's next?</h2>
      <div class="skeleton mt-1 h-4 w-28"></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-28"></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="flex grow"></div>
      <div class="card-actions justify-end">
        <a href="/"
           class="btn btn-primary text-primary-content"
           target="_blank"
           rel="noopener"
        >
          RECURSION!
        </a>
      </div>
    </div>
  {/if}
</div>

