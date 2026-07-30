import { DocumentData, DocumentVersion } from "@/data/types";

// Get the current version object corresponding to currentVersion slug
export function getCurrentVersion(doc: DocumentData): DocumentVersion | undefined {
  return doc.versions.find((v) => v.version === doc.currentVersion);
}

// Get all versions that are published
export function getPublishedVersions(doc: DocumentData): DocumentVersion[] {
  return doc.versions.filter((v) => v.status === "published");
}

// Get a specific version by its version string (e.g., 'v1.0')
export function getVersionByNumber(doc: DocumentData, versionNumber: string): DocumentVersion | undefined {
  return doc.versions.find((v) => v.version === versionNumber);
}

// Sort versions by date in descending order (newest first)
export function sortVersionsByDate(versions: DocumentVersion[]): DocumentVersion[] {
  return [...versions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Compare two versions based on their changelog (changes) arrays
export function compareVersions(current: DocumentVersion, previous: DocumentVersion) {
  const currentChanges = current.changes || [];
  const previousChanges = previous.changes || [];

  const added = currentChanges.filter((item) => !previousChanges.includes(item));
  const removed = previousChanges.filter((item) => !currentChanges.includes(item));

  return {
    previousVersion: previous.version,
    currentVersion: current.version,
    added,
    removed,
  };
}
