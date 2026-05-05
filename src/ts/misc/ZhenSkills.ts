import BackgroundVideo from "$lib/videos/DeprivedDevMontage.gif";

export class Skill {
  image: string | undefined;
  alt: string | undefined;
  link: string | undefined;

  public constructor(
    alt: string,
    image: string,
    link: string | undefined = undefined,
  ) {
    this.image = "https://deprived.dev/assets/website/icons/" + image;
    this.alt = alt;
    this.link = link;
  }
}

export function getSkills(cvLink: string): Skill[] {
  let arr = []; // ineffecient implimentation, but who cares lol

  arr.push(new Skill("C", "c.svg", "https://github.com/MagicBOTAlex/ZSwitch"));
  arr.push(
    new Skill("C++", "cpp.svg", "https://github.com/MagicBOTAlex/DesktopPlus"),
  );
  arr.push(new Skill("C#", "csharp.svg"));
  arr.push(
    new Skill(
      "Python",
      "python.svg",
      "https://github.com/MagicBOTAlex/MLEyeTrack",
    ),
  );
  arr.push(
    new Skill(
      "Rust",
      "rust.svg",
      "https://github.com/galister/oscavmgr/pull/21",
    ),
  );

  arr.push(
    new Skill(
      "Espressif",
      "espressif.svg",
      "https://deprived.dev/assets/website/zhen/projects/countr-prototype.mp4",
    ),
  );

  // Embedded
  arr.push(
    new Skill(
      "Arduino",
      "arduino.svg",
      "https://github.com/MagicBOTAlex/ZSwitch",
    ),
  );

  // frontend
  arr.push(new Skill("Svelte", "svelte.svg", cvLink));
  arr.push(new Skill("Tailwind", "tailwind.svg", cvLink));
  arr.push(
    new Skill(
      "JavaScript",
      "javascript.svg",
      "https://github.com/MagicBOTAlex/MomHelper",
    ),
  );
  arr.push(new Skill("TypeScript", "typescript.svg", cvLink));
  arr.push(
    new Skill("Tauri", "tauri.svg", "https://github.com/MagicBOTAlex/ComboFT"),
  );
  arr.push(new Skill("CSS", "css.svg", cvLink));
  arr.push(new Skill("DaisyUI", "daisyui.svg", cvLink));
  arr.push(new Skill("Cloudflare", "cloudflare.svg", cvLink));

  // homelab
  arr.push(new Skill("Homeassist", "homeassistant.svg"));
  arr.push(new Skill("ESPHome", "esphome.svg"));
  arr.push(new Skill("WireGuard", "wireguard.svg"));
  arr.push(
    new Skill(
      "Docker",
      "docker.svg",
      "https://github.com/MagicBOTAlex/DockeredMLEyeTrack",
    ),
  );
  arr.push(new Skill("Argo", "argo.svg"));
  arr.push(new Skill("Kubernetes", "kubernetes.svg"));
  arr.push(
    new Skill(
      "Linux",
      "linux.svg",
      "https://github.com/MagicBOTAlex/nixos-server",
    ),
  );
  arr.push(
    new Skill(
      "NixOS",
      "nixos.svg",
      "https://github.com/MagicBOTAlex/nixos-desktop",
    ),
  );
  arr.push(new Skill("Debian", "debian.svg"));
  arr.push(new Skill("Ubuntu", "ubuntu.svg"));
  arr.push(
    new Skill(
      "Neovim",
      "neovim.svg",
      "https://github.com/MagicBOTAlex/NVimConfigs",
    ),
  );

  arr.push(new Skill("nRF", "nrf.svg"));
  arr.push(new Skill("OpenCV", "opencv.svg"));
  arr.push(
    new Skill(
      "OpenPnP",
      "openpnp.svg",
      "https://deprived.dev/assets/website/zhen/projects/openpnp.mp4",
    ),
  );
  arr.push(
    new Skill(
      "PlatformIO",
      "platformio.svg",
      "https://github.com/MagicBOTAlex/ZSwitch",
    ),
  );
  arr.push(new Skill("PocketBase", "pocketbase.svg"));
  arr.push(
    new Skill(
      "QEMU",
      "qemu.svg",
      "https://github.com/MagicBOTAlex/nixos-server/tree/master/vms/kube-daddy",
    ),
  );
  arr.push(new Skill("Rasp Pi", "raspberrypi.svg"));
  arr.push(new Skill("Sass", "sass.svg"));
  arr.push(new Skill("Shopify", "shopify.svg"));

  // VR
  arr.push(new Skill("SlimeVR", "slimevr.svg"));
  arr.push(
    new Skill(
      "SteamVR",
      "steamvr.webp",
      "https://github.com/elvissteinjr/DesktopPlus",
    ),
  );
  arr.push(
    new Skill(
      "Babble",
      "babble.svg",
      "https://github.com/Project-Babble/Baballonia/pull/215",
    ),
  );
  arr.push(
    new Skill(
      "Eyetracking",
      "etvr.png",
      "https://github.com/MagicBOTAlex/MLEyeTrack",
    ),
  );

  // AI
  arr.push(new Skill("Jupyter", "jupiter.svg"));
  arr.push(new Skill("PyTorch", "pytorch.svg"));
  arr.push(new Skill("Keras", "keras.svg"));
  arr.push(new Skill("TensorFlow", "tensorflow.svg"));

  // Game dev
  arr.push(new Skill("Unity", "unity.svg", BackgroundVideo));
  arr.push(new Skill("Blender", "blender.svg"));
  arr.push(
    new Skill(
      "CADSketch",
      "CADSketcher.png",
      "https://github.com/hlorus/CAD_Sketcher/pull/481",
    ),
  );
  arr.push(new Skill("FreeCAD", "freecad.svg"));
  arr.push(
    new Skill(
      "Fusion360",
      "fusion360.svg",
      "https://github.com/MagicBOTAlex/ZSwitch",
    ),
  );

  // Misc
  arr.push(
    new Skill(
      "MudBlazor",
      "mudblazor.svg",
      "https://github.com/MudBlazor/MudBlazor/pull/7327",
    ),
  );
  arr.push(new Skill("Ollama", "ollama.svg"));
  arr.push(new Skill("Gitea", "gitea.svg"));
  // arr.push(new Skill("Astro", "astro.png"));
  arr.push(new Skill("KiCad", "kicad.svg"));
  // arr.push(new Skill("Lua", "lua.svg"));

  return arr;
}
