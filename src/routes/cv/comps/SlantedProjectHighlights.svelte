<script>
  const baseClass =
    "h-56 w-full bg-slate-400 flex text-white font-bold text-2xl";
  import * as m from "$paraglide/messages";
  import Expand from "@lucide/svelte/icons/expand";
</script>

<div class="bg-[#121212] relative w-full flex justify-between">
  <div class="col-l w-full relative h-full flex flex-col gap-2 p-8">
    <div class="text-2xl py-4">{m["zhen.cv.page2.title"]()}</div>
    <div class={baseClass}>
      <div class="w-full flex flex-col pr-[7cm]">
        <div class="w-full text-[#121212] bg-[#f1f1f1] px-2">
          Kubernetes Cluster
        </div>
        <div class="relative flex-1 w-full flex min-h-0">
          <div class="w-full relative max-h-full flex flex-col">
            <div class="w-full h-full flex flex-col">
              <img
                class="w-full h-full object-cover"
                src="https://deprived.dev/assets/website/zhen/cv/fossflow-kubernetes.png"
                alt=""
              />
            </div>
          </div>
          <div class="absolute left-0 bottom-0">
            <a
              href="https://deprived.dev/assets/website/zhen/cv/fossflow-kubernetes.png"
              target="_blank"
            >
              <div class="p-1">
                <Expand />
              </div>
            </a>
          </div>
          <div
            class="absolute kube-split bg-white/75 left-0 right-0 flex flex-col h-full"
          >
            <div class="pl-[245px] h-full w-full">
              {#if true}
                {@const rotation = "15deg"}
                <div
                  class="h-full flex flex-col text-[#222222] text-xs py-7"
                  style="transform: rotate({rotation});"
                >
                  <div style="transform: rotate(-{rotation});">
                    Multi-node cluster
                  </div>
                  <div style="transform: rotate(-{rotation});">
                    with vpn vlan
                  </div>
                  <div style="transform: rotate(-{rotation});">
                    connected through
                  </div>
                  <div style="transform: rotate(-{rotation});">wide-web by</div>
                  <div style="transform: rotate(-{rotation});">
                    Wireguard mesh
                  </div>
                  <div style="transform: rotate(-{rotation});">running in</div>
                  <div style="transform: rotate(-{rotation});">
                    in Qemu on NixOS
                  </div>
                  <div style="transform: rotate(-{rotation});"><br /></div>
                  <div style="transform: rotate(-{rotation});"><br /></div>
                  <div
                    style="transform: rotate(-{rotation});"
                    class="text-[0.6rem]"
                  >
                    Actual cluster diagram
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class={baseClass}>
      <div class="w-full flex flex-col pr-[9cm]">
        <div class="w-full text-[#121212] bg-[#f1f1f1] px-2">PCB Design</div>
        <div class="relative flex-1 w-full flex min-h-0">
          <div
            class="w-full relative h-full flex flex-col justify-evenly pr-[45%]"
          >
            <img
              class="w-full flex-1 object-cover min-h-0"
              src="https://deprived.dev/assets/website/zhen/cv/kicad-pcb.png"
              alt=""
            />
            <img
              class="w-full flex-1 object-cover min-h-0"
              src="https://deprived.dev/assets/website/zhen/cv/soldering-stack.jpeg"
              alt=""
            />
          </div>
          <div class="absolute quad-split left-0 right-0 flex flex-col h-full">
            <img
              class="w-full h-full object-fit"
              src="https://deprived.dev/assets/website/zhen/cv/pnp.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="col-border absolute bg-[#121212] left-0 right-0 h-full flex flex-col gap-2 p-8"
  ></div>
  <div
    class="col-border-2 absolute left-0 right-0 h-full flex flex-col gap-2 p-8"
  ></div>
  <div class="col-r absolute left-0 right-0 h-full flex flex-col gap-2 p-8">
    <div class="text-2xl p-4"><br /></div>
    <div class="{baseClass} ">
      <div class="w-full flex flex-col pl-[9.5cm]">
        <div class="w-full text-[#121212] bg-[#f1f1f1] text-end px-2">
          Frontend
        </div>
        <img
          class="w-full h-full object-cover object-top-left"
          src="https://deprived.dev/assets/website/zhen/cv/cv-inception.png"
          alt=""
        />
      </div>
    </div>
    <div class="{baseClass} ">
      <div class="w-full flex flex-col pl-[7.5cm]">
        <div class="w-full text-[#121212] bg-[#f1f1f1] text-end px-2">
          Embedded
        </div>
        <div class="relative flex-1 w-full flex min-h-0">
          <div class="w-full relative h-full flex flex-col">
            <img
              class="w-full h-full object-cover pr-25"
              src="https://deprived.dev/assets/website/zhen/cv/countrProto.jpeg"
              alt=""
            />
          </div>
          <div
            class="absolute split-embedded left-0 right-0 flex flex-col h-full"
          >
            <img
              class="w-full h-full pl-45 object-cover"
              src="https://deprived.dev/assets/website/zhen/cv/selfie.jpeg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  div {
    /* Counts from left side*/
    --top: 60%;
    --bot: calc(100% - var(--top));
  }

  .col-r {
    clip-path: polygon(var(--top) 0, 100% 0, 100% 100%, var(--bot) 100%);
  }
  .quad-split {
    --ratio: 57.5%;
    --offset: -7.5%;
    clip-path: polygon(
      calc(var(--ratio) + var(--offset)) 0,
      100% 0,
      100% 100%,
      calc(100% - var(--ratio) + var(--offset)) 100%
    );
    /* clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%); */
  }
  .split-frontend {
    --ratio: 57.5%;
    --offset: 7.5%;
    clip-path: polygon(
      calc(var(--ratio) + var(--offset)) 0,
      100% 0,
      100% 100%,
      calc(100% - var(--ratio) + var(--offset)) 100%
    );
    /* clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%); */
  }
  .split-embedded {
    --ratio: 56%;
    --offset: 0%;
    clip-path: polygon(
      calc(var(--ratio) + var(--offset)) 0,
      100% 0,
      100% 100%,
      calc(100% - var(--ratio) + var(--offset)) 100%
    );
    /* clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%); */
  }
  .kube-split {
    --ratio: 56%;
    --offset: 1%;
    clip-path: polygon(
      calc(var(--ratio) + var(--offset)) 0,
      100% 0,
      100% 100%,
      calc(100% - var(--ratio) + var(--offset)) 100%
    );
  }
  .col-border {
    --border-size: 16px;
    clip-path: polygon(
      calc(var(--top) - var(--border-size)) 0,
      100% 0,
      100% 100%,
      calc(var(--bot) - var(--border-size)) 100%
    );
  }
  .col-border-2 {
    --border-size: 0px;
    clip-path: polygon(
      calc(var(--top) - var(--border-size)) 0,
      100% 0,
      100% 100%,
      calc(var(--bot) - var(--border-size)) 100%
    );
  }
</style>
