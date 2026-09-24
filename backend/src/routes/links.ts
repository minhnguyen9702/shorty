import { randomBytes } from "node:crypto";
import { Router } from "express";
import { eq } from "drizzle-orm";
import { baseUrl } from "../config.ts";
import { db } from "../db/client.ts";
import { links } from "../db/schema.ts";

export const linksRouter = Router();

function generateSlug() {
    return randomBytes(6).toString("base64url");
}

function isValidUrl(value: unknown): value is string {
    if (typeof value !== "string" || !URL.canParse(value)) return false;
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:";
}

linksRouter.post("/links", async (req, res) => {
    const { url } = req.body ?? {};
    if (!isValidUrl(url)) {
        res.status(400).json({ error: "url must be a valid http(s) URL" });
        return;
    }

    for (let attempt = 0; attempt < 5; attempt++) {
        const [link] = await db
            .insert(links)
            .values({ slug: generateSlug(), url })
            .onConflictDoNothing({ target: links.slug })
            .returning();

        if (link) {
            const shortUrl = `${baseUrl}/${link.slug}`;
            res.status(201).json({ slug: link.slug, url: link.url, shortUrl });
            return;
        }
    }

    res.status(500).json({ error: "could not generate a unique slug" });
});

linksRouter.get("/:slug", async (req, res) => {
    const [link] = await db
        .select()
        .from(links)
        .where(eq(links.slug, req.params.slug))
        .limit(1);

    if (!link) {
        res.status(404).json({ error: "not found" });
        return;
    }

    res.redirect(302, link.url);
});
