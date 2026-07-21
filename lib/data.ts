/**
 * Typed access to the JSON content layer in /data.
 * Pages import from here so the shape of the data lives in one place.
 */
import site from "@/data/site.json";
import navigation from "@/data/navigation.json";
import schedule from "@/data/schedule.json";
import events from "@/data/events.json";
import churches from "@/data/churches.json";
import executive from "@/data/executive.json";
import downloads from "@/data/downloads.json";
import gallery from "@/data/gallery.json";
import faqs from "@/data/faqs.json";
import about from "@/data/about.json";
import announcement from "@/data/announcement.json";

export { site, navigation, schedule, events, churches, executive, downloads, gallery, faqs, about, announcement };

export type WeeklyEntry = (typeof schedule.weekly)[number];
export type SpecialEvent = (typeof events.upcoming)[number];
export type Church = (typeof churches.churches)[number];
