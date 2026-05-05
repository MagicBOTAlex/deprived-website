// npm i zod
import { z } from "zod";

const Link = z.object({
  imageId: z.string().min(1).optional(),
  text: z.string().min(1),
  link: z.string().url(),
});

const Experience = z.object({
  imageId: z.string().min(1),
  name: z.string().min(1),
  date: z.string().min(1),
});

const EducationLoose = z.object({
  imageId: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
});

const CV = z.object({
  sourceLink: z.string().url().min(1),
});

const ProfileSchema = z.object({
  name: z.string().min(1),
  key: z.string().min(1),
  selfie: z.string().min(1),
  nick: z.string().min(1),
  shortProfileHiddenContent: z.array(z.string()),
  email: z.string().email(),
  phone: z.string().min(1),
  linkedIn: Link,
  itch: Link,
  cv: CV,
  experience: z.array(Experience),
  education: z
    .array(EducationLoose)
    .transform((arr) =>
      arr.filter(
        (e): e is { imageId: string; name: string } => !!e.imageId && !!e.name,
      ),
    ),
});

export type LinkT = z.infer<typeof Link>;
export type ExperienceT = z.infer<typeof Experience>;
export type EducationT = { imageId: string; name: string };
export type Profile = Omit<z.infer<typeof ProfileSchema>, "education"> & {
  education: EducationT[];
};

export function parseProfile(json: unknown): Profile {
  return ProfileSchema.parse(json);
}

// --- usage ---
// const raw = JSON.parse(yourJsonString);
// const profile = parseProfile(raw);
