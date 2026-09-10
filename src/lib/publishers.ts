/**
 * Provides publisher lookup helpers for the build-time Astro data layer.
 *
 * These read-only queries keep the app's static pages and components fully
 * decoupled from UI logic while still exposing the data needed for filter and
 * display views.
 */

import { asc } from 'drizzle-orm';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';
import type { Database } from './db';

/**
 * Gets all publishers ordered alphabetically by name.
 *
 * The returned records are intentionally minimal and include only the publisher
 * identifier and display name needed by list views and filters.
 *
 * @param db - The database connection used to read publisher records.
 * @returns A promise resolving to all publishers sorted by name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    return db
        .select({ id: publishers.id, name: publishers.name })
        .from(publishers)
        .orderBy(asc(publishers.name));
}
